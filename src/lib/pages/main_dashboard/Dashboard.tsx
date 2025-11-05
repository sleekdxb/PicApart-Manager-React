import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import liquidityscore from "../../../assets/images/liquidityscore.png";
import currency from "../../../assets/images/currency.png";
import activedealers from "../../../assets/images/active_dealers.png";
import chartbar from "../../../assets/images/chartbar.png";
import revenuerisk from "../../../assets/images/revenue risk.png";
import failedpayment from "../../../assets/images/failed_payment.png";
import subscription from "../../../assets/images/subscription_ending.png";
import liquidity from "../../../assets/images/liquidity.png";
import quickactions from "../../../assets/images/quick_actions.png";
import approvedealers from "../../../assets/images/UserSwitch.png";
import respondtickets from "../../../assets/images/respond_tickets.png";
import viewalerts from "../../../assets/images/view_alerts.png";
import generatereport from "../../../assets/images/generate_report.png";

import EngagementFunnelChart from "../../charts/EngagementFunnelChart";
import SubscriptionHealthChart from "../../charts/SubscriptionHealthChart";
import CommonNavbar from "../../components/CommonNavbar";
import KPIStatCard from "./component/KPIStatCard";
import DemandGapItem from "./component/DemandGapItem";
import QuickActionItem from "./component/QuickActionItem";
import { fetchDashboardStatistics, type DashboardStatisticsDataItem } from "../../../services/dashboardService";
import { getStoredAuth } from "../../../services/authService";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStatisticsDataItem | null>(null);

  // Fetch dashboard statistics on component mount
  useEffect(() => {
    let cancelled = false;
    
    async function loadDashboardStatistics() {
      const auth = getStoredAuth();
      if (!auth?.data?.staff?.staff_id) {
        setError("Staff ID not found. Please login again.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await fetchDashboardStatistics([
          {
            staff_id: auth.data.staff.staff_id,
            sta_goal: "overview",
          },
        ]);

        if (cancelled) return;

        if (response.status && response.data && response.data.length > 0) {
          // Use the first data item (or merge all if needed)
          setStats(response.data[0]);
          setSuccess("Dashboard statistics loaded successfully");
          setError(null);
        } else {
          setError("No dashboard statistics data received");
          setStats(null);
        }
      } catch (e: any) {
        if (cancelled) return;
        console.error("[Dashboard] Error loading statistics:", e);
        setError(e?.message || "Failed to load dashboard statistics");
        setStats(null);
        setSuccess(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboardStatistics();
    return () => {
      cancelled = true;
    };
  }, []);

  // Helper functions for data processing
  const coerceMetricValue = (value?: number | string) => {
    const numericValue = typeof value === "string" ? Number(value) : value;
    return typeof numericValue === "number" && Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
  };

  const getFlexibleStatValue = (item: DashboardStatisticsDataItem | null, key: string) => {
    if (!item) return undefined;
    const loose = item as unknown as Record<string, number | string | undefined>;
    return loose[key];
  };

  const hasNumericValue = (value?: number | string) => {
    const numericValue = typeof value === "string" ? Number(value) : value;
    return typeof numericValue === "number" && Number.isFinite(numericValue);
  };

  const quickActionCounts = {
    approveDealers: coerceMetricValue(stats?.quick_actions?.pending_vendors),
    respondTickets: coerceMetricValue(stats?.quick_actions?.pending_tickets),
    viewAlerts: coerceMetricValue(stats?.quick_actions?.pending_alerts),
    generateReport: coerceMetricValue(stats?.quick_actions?.reports_ready),
  };

  const rawTotalTyres = stats?.total_tyres;
  const totalTyres = coerceMetricValue(rawTotalTyres);
  const totalTyresDisplay = hasNumericValue(rawTotalTyres) ? totalTyres : "--";

  const approvedVendorsRaw =
    stats?.approved_vendors_last4months ??
    getFlexibleStatValue(stats, "approved_vendors_Last4Months");
  const approvedVendorsLast4Months = coerceMetricValue(approvedVendorsRaw);
  const approvedVendorsLast4MonthsDisplay = hasNumericValue(approvedVendorsRaw) ? approvedVendorsLast4Months : "--";

  const quarterArppd = coerceMetricValue(stats?.quarter_arppd);

  // Engagement funnel data processing
  const normalizeStageKey = (raw: string) =>
    raw
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

  const engagementFunnelStages: Array<{ label: string; keys: string[] }> = [
    { label: "Request Part", keys: ["request_part", "requestpart", "requests", "request"] },
    { label: "Notified", keys: ["notified"] },
    { label: "Part Click", keys: ["part_click", "partclick", "clicks", "click"] },
    { label: "Contacts", keys: ["contacts", "contact"] },
  ];

  const formatStageLabel = (raw: string) =>
    raw
      .split(/[_\s]+/)
      .map((segment) => (segment ? `${segment.charAt(0).toUpperCase()}${segment.slice(1)}` : segment))
      .join(" ");

  const engagementFunnelEntries = stats?.engagement_funnel ?? {};
  const normalizedEngagementEntries: Record<string, number> = {};
  Object.entries(engagementFunnelEntries).forEach(([rawKey, rawValue]) => {
    const normalizedKey = normalizeStageKey(rawKey);
    if (!normalizedKey) return;
    if (rawValue !== null && rawValue !== undefined) {
      const numValue = typeof rawValue === "string" ? Number(rawValue) : rawValue;
      if (typeof numValue === "number" && Number.isFinite(numValue) && numValue > 0) {
        normalizedEngagementEntries[normalizedKey] = numValue;
      }
    }
  });

  const usedEngagementKeys = new Set<string>();
  const engagementFunnelPrimary = engagementFunnelStages
    .map(({ label, keys }) => {
      const normalizedKeys = keys.map(normalizeStageKey);
      const matchedKey = normalizedKeys.find((normalizedKey) => normalizedEngagementEntries[normalizedKey] !== undefined);
      if (matchedKey) usedEngagementKeys.add(matchedKey);
      return matchedKey
        ? {
            stage: label,
            value: normalizedEngagementEntries[matchedKey],
          }
        : null;
    })
    .filter((item): item is { stage: string; value: number } => item !== null);

  const engagementFunnelExtra = Object.entries(normalizedEngagementEntries)
    .filter(([key]) => !usedEngagementKeys.has(key))
    .map(([key, value]) => ({
      stage: formatStageLabel(key),
      value,
    }));

  const engagementFunnelData = [...engagementFunnelPrimary, ...engagementFunnelExtra];
  const hasEngagementData = engagementFunnelData.length > 0 && engagementFunnelData.some((item) => item.value > 0);

  // Subscription health data processing
  // First, process the API data to extract valid months with values
  const apiDataMap = new Map<string, number>();
  (stats?.subscription_health ?? []).forEach((item) => {
    const month = item?.month;
    const rawTotal = item?.total;

    if (rawTotal === null || rawTotal === undefined || !month) {
      return;
    }

    const numTotal = typeof rawTotal === "string" ? Number(rawTotal) : rawTotal;
    if (typeof numTotal === "number" && Number.isFinite(numTotal) && numTotal > 0) {
      // Store the value with the month key (e.g., "2025-09")
      apiDataMap.set(month, numTotal);
    }
  });

  // Generate all months for the last 12 months
  const now = new Date();
  const allMonths: Array<{ month: string; monthKey: string; order: number; total: number }> = [];
  
  // Start from 11 months ago (to show last 12 months including current)
  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const current = new Date(startDate);

  // Generate all 12 months
  while (allMonths.length < 12) {
    const formatter = new Intl.DateTimeFormat("en", { month: "short" });
    // Just use month name like "Jan", "Feb", "Mar" etc.
    const monthLabel = formatter.format(current);
    const monthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
    
    // Get value from API data if exists, otherwise 0
    const total = apiDataMap.get(monthKey) || 0;
    
    allMonths.push({
      month: monthLabel,
      monthKey,
      order: current.getTime(),
      total,
    });

    // Move to next month
    current.setMonth(current.getMonth() + 1);
  }

  // Format for chart component (already sorted by order)
  const subscriptionHealthData = allMonths.map(({ month, total }) => ({ month, total }));
  const hasSubscriptionHealthData = subscriptionHealthData.length > 0;

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* === Sidebar === */}
      <Sidebar
        collapsed={collapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* === Navbar with Toggle Button === */}
      <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dashboard Overview" />

      {/* === Main Content === */}
      <main
        className={`p-6 mt-10 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* === Loading State === */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3E38DA]"></div>
              <p className="mt-4 text-sm text-gray-600">Loading dashboard statistics...</p>
            </div>
          </div>
        )}

        {/* === Error State === */}
        {!loading && error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-semibold">Error:</span>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* === Success State (optional notification) === */}
        {!loading && success && !error && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-700 text-sm">{success}</span>
          </div>
        )}

        {/* === Dashboard Content === */}
        {!loading && (
          <>
            {/* ===============four cards section ============== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPIStatCard
                title="Total Listings"
                value={
                  <>
                    <h3 className="text-lg font-bold text-black">{stats?.total_listings ?? 87}</h3>
                    <span className="text-sm text-gray-700">/{totalTyresDisplay}</span>
                  </>
                }
                rightIconSrc={liquidityscore}
                rightIconAlt="liquidity score"
                rightIconBgClassName="bg-[#DBEAFE]"
              >
                <div className="text-sm text-green-700">
                  <span>Auto Spare Parts Vs Tyres</span>
                </div>
              </KPIStatCard>

              <KPIStatCard
                title="MRR"
                value={<h3 className="text-md font-bold text-black">AED{stats?.mrr ?? 24589}</h3>}
                rightIconSrc={currency}
                rightIconAlt="currency"
                rightIconBgClassName="bg-[#CAFFDC]"
              >
                <div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
                  <div className="bg-[#E9E9E9] h-2 rounded-full"></div>
                </div>
              </KPIStatCard>

              <KPIStatCard
                title="Active Dealers"
                value={<h3 className="text-lg font-bold text-black">{stats?.active_vendors ?? 124}</h3>}
                rightIconSrc={activedealers}
                rightIconAlt="active dealers"
                rightIconBgClassName="bg-[#F2E7FF]"
                rightIconSizeClassName="w-5 h-4"
              >
                <div className="flex items-center justify-between text-sm text-green-700">
                  <span>Approved (Last 4 Months)</span>
                  <span className="font-semibold text-gray-900">{approvedVendorsLast4MonthsDisplay}</span>
                </div>
              </KPIStatCard>

              <KPIStatCard
                title="ARPPD"
                value={<h3 className="text-lg font-bold text-black">AED{stats?.arppd ?? 198.3}</h3>}
                rightIconSrc={chartbar}
                rightIconAlt="chartbar"
                rightIconBgClassName="bg-[#FEF9C3]"
              >
                <div className="flex items-center justify-between text-sm text-green-700">
                  <span>Quarter ARPPD</span>
                  <span className="font-semibold text-gray-900">AED{quarterArppd}</span>
                </div>
              </KPIStatCard>
            </div>

            {/* === charts section ==========*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="mt-3 gap-3">
                <EngagementFunnelChart data={hasEngagementData ? engagementFunnelData : undefined} />
              </div>
              <div className="mt-3">
                <SubscriptionHealthChart data={hasSubscriptionHealthData ? subscriptionHealthData : undefined} />
              </div>
            </div>

            {/* ============ three card section ============= */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Revenue Risk Alerts */}
              <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-black">Revenue Risk Alerts</h3>
                  <img src={revenuerisk} alt="revenue risk" className="w-5 h-5" />
                </div>

                {/* == failed payments == */}
                <div className="flex items-center gap-3 mt-4 ">
                  <div className="p-2 bg-[#FEE2E2]">
                    <img src={failedpayment} alt="failed payment" className="w-5 h-5"/>
                  </div>
                  <div className="flex-col items-center">
                    <h3 className="text-sm text-black font-bold">Failed payments 2 attempts</h3>
                    <h3 className="text-sm text-gray-700">3 dealers with payment issues</h3>
                  </div>
                </div>

                {/* == subscription section == */}
                <div className="flex items-center gap-3 mt-4 mb-6 ">
                  <div className="p-2 bg-[#FEF9C3]">
                    <img src={subscription} alt="subscription ending" className="w-5 h-5"/>
                  </div>
                  <div className="flex-col items-center">
                    <h3 className="text-sm text-black font-bold">Subscriptions ending soon</h3>
                    <h3 className="text-sm text-gray-700">7 dealers with expiring subscriptions</h3>
                  </div>
                </div>
              </div>

              {/* ===============liquidity gaps section card =============== */}
              <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-black">Liquidity Gaps</h3>
                  <img src={liquidity} alt="revenue risk" className="w-5 h-5" />
                </div>

                {(() => {
                  const gaps = stats?.liquidity_gaps || [];
                  if (!gaps.length) {
                    return <div className="text-sm text-gray-600 mt-3 px-3">No gaps</div>;
                  }
                  // Sort gaps by total_records in descending order (highest first)
                  const sortedGaps = [...gaps].sort((a, b) => {
                    const aValue = a.total_records || 0;
                    const bValue = b.total_records || 0;
                    return bValue - aValue; // Descending order
                  });
                  const maxRecords = Math.max(...sortedGaps.map((g) => Math.max(1, g.total_records || 0)), 1);
                  return (
                    <div className="mt-3 max-h-56 overflow-y-auto pr-1">
                      {sortedGaps.map((g, idx) => {
                        const pct = Math.round(((g.total_records || 0) / maxRecords) * 100);
                        return (
                          <DemandGapItem
                            key={`${g.part_combination}-${idx}`}
                            title={g.part_combination}
                            percentage={pct}
                            displayValue={g.total_records || 0}
                            displaySuffix="records"
                          />
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* ==== Quick Actions card ==== */}
              <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-black">Quick Actions</h3>
                  <img src={quickactions} alt="revenue risk" className="w-5 h-5" />
                </div>

                <div className="grid grid-col-1 md:grid-cols-2 gap-2">
                  <QuickActionItem title="Pending Dealers" iconSrc={approvedealers} count={quickActionCounts.approveDealers} />
                  <QuickActionItem title="Respond Tickets" iconSrc={respondtickets} count={quickActionCounts.respondTickets} />
                  <QuickActionItem title="View Alerts" iconSrc={viewalerts} count={quickActionCounts.viewAlerts} />
                  <QuickActionItem title="Generate Report" iconSrc={generatereport} count={quickActionCounts.generateReport} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}