


import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import CommonNavbar from "../../../components/CommonNavbar";
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
import DemandGapItem from "./component/DemandGapItem";
import QuickActionItem from "./component/QuickActionItem";
import AlertItem from "./component/AlertItem";
import KPIStatCard from "./component/KPIStatCard";
import { fetchDashboardStatistics, type DashboardStatisticsDataItem } from "../../../services/dashboardService";

function getStoredStaffId(): string | null {
  try {
    const raw = localStorage.getItem("staffAuth");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      data?: { staff?: { staff_id?: string } };
    };
    return parsed?.data?.staff?.staff_id ?? null;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false); void loading;
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStatisticsDataItem | null>(null);

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
    normalizedEngagementEntries[normalizedKey] = coerceMetricValue(rawValue as number);
  });

  const usedEngagementKeys = new Set<string>();
  const engagementFunnelPrimary = engagementFunnelStages.map(({ label, keys }) => {
    const normalizedKeys = keys.map(normalizeStageKey);
    const matchedKey = normalizedKeys.find((normalizedKey) => normalizedEngagementEntries[normalizedKey] !== undefined);
    if (matchedKey) usedEngagementKeys.add(matchedKey);
    return {
      stage: label,
      value: matchedKey ? normalizedEngagementEntries[matchedKey] : 0,
    };
  });

  const engagementFunnelExtra = Object.entries(normalizedEngagementEntries)
    .filter(([key]) => !usedEngagementKeys.has(key))
    .map(([key, value]) => ({
      stage: formatStageLabel(key),
      value,
    }));

  const engagementFunnelData = [...engagementFunnelPrimary, ...engagementFunnelExtra];
  const hasEngagementData = engagementFunnelData.some((item) => item.value > 0);

  const subscriptionHealthData = (stats?.subscription_health ?? [])
    .map((item) => {
      const month = item?.month;
      const total = coerceMetricValue(item?.total);
      if (!month) {
        return { month: "N/A", total, order: Number.POSITIVE_INFINITY };
      }

      const parsedDate = new Date(`${month}-01T00:00:00`);
      if (!Number.isFinite(parsedDate.getTime())) {
        return { month, total, order: Number.POSITIVE_INFINITY };
      }

      const formatter = new Intl.DateTimeFormat("en", { month: "short" });
      const label = `${formatter.format(parsedDate)} ${String(parsedDate.getFullYear()).slice(-2)}`;
      return { month: label, total, order: parsedDate.getTime() };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ month, total }) => ({ month, total }));

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);

      // ⬇️ Get staff_id from localStorage (persisted after login)
      const staffId =


        // "612dd1f0-8cd5-41f5-8b82-17cd40144e52"

        getStoredStaffId();
      if (!staffId) {
        if (!cancelled) {
          setError("No logged-in staff found. Please log in again.");
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetchDashboardStatistics([
          { staff_id: staffId, sta_goal: "overview" },
        ]);
        if (cancelled) return;
        const first = Array.isArray(res?.data) && res.data.length > 0 ? res.data[0] : null;
        setStats(first);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load statistics");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

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
        className={`p-6 mt-10 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"
          }`}
      >
        {/* ===============four cards section ============== */}
        {error ? (
          <div className="mb-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2">{error}</div>
        ) : null}
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
            <div className="text-sm text-gray-700">
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
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>Approved Vendors (Last 4 Months)</span>
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
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>Quarter ARPPD</span>
              <span className="font-semibold text-gray-900">AED{quarterArppd}</span>
            </div>
          </KPIStatCard>
        </div>
        {/* === charts section ==========*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className=" mt-3 gap-3">
            <EngagementFunnelChart data={hasEngagementData ? engagementFunnelData : undefined} />
          </div>
          <div className=" mt-3">
            <SubscriptionHealthChart data={subscriptionHealthData} />
          </div>
        </div>

        {/* ============ three card section ============= */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex  justify-between items-center">
              <h3 className="text-sm font-semibold text-black">Revenue Risk Alerts</h3>
              <img src={revenuerisk} alt="revenue risk" className="w-5 h-5" />
            </div>

            {/* == failed payments == */}
            <div className="mt-4">
              <AlertItem
                iconSrc={failedpayment}
                title="Failed payments 2 attempts"
                subtitle="3 dealers with payment issues"
                iconBgClassName="bg-[#FEE2E2]"
              />
            </div>

            {/* == subscription section == */}
            <div className="mt-4 mb-6">
              <AlertItem
                iconSrc={subscription}
                title="Subscriptions ending soon"
                subtitle="7 dealers with expiring subscriptions"
                iconBgClassName="bg-[#FEF9C3]"
              />
            </div>
          </div>

          {/* ===============liquidity gaps section card =============== */}
          <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex  justify-between items-center">
              <h3 className="text-sm font-semibold text-black">Liquidity Gaps</h3>
              <img src={liquidity} alt="revenue risk" className="w-5 h-5" />
            </div>

            {(() => {
              const gaps = stats?.liquidity_gaps || [];
              if (!gaps.length) {
                return <div className="text-sm text-gray-600 mt-3 px-3">No gaps</div>;
              }
              const maxRecords = Math.max(...gaps.map((g) => Math.max(1, g.total_records || 0)), 1);
              return (
                <div className="mt-3 max-h-56 overflow-y-auto pr-1">
                  {gaps.map((g, idx) => {
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
            <div className="flex  justify-between items-center">
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

      </main>
    </div>
  );
}
