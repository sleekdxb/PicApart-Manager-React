import { authApiClient } from "../lib/api_client/api_client";
import { buildApiUrl } from "../lib/api_client/config";

export interface DashboardStatisticsRequestItem {
  staff_id: string;
  sta_goal: string; // e.g., 'overview'
}

export interface DashboardStatisticsDataItem {
  staff_id: string;
  total_listings: number;
  total_tyres?: number;
  active_vendors: number;
  approved_vendors_last4months?: number;
  mrr: number;
  arppd: number;
  quarter_arppd?: number;
  engagement_funnel?: Record<string, number>;
  subscription_health?: Array<{ month: string; total: number }>; // month like '2025-09'
  liquidity_gaps?: Array<{ part_combination: string; total_records: number }>;
  quick_actions?: {
    pending_vendors?: number;
    pending_tickets?: number;
    pending_alerts?: number;
    reports_ready?: number;
    [key: string]: number | undefined;
  };
}

export interface DashboardStatisticsResponse {
  status: boolean;
  message: string;
  data: DashboardStatisticsDataItem[];
}

function getAuthToken(): string | undefined {
  try {
    return localStorage.getItem("authToken") || undefined;
  } catch {
    return undefined;
  }
}

export async function fetchDashboardStatistics(payloadItems: DashboardStatisticsRequestItem[]): Promise<DashboardStatisticsResponse> {
  const endpoint = "/public/api/statistics/dashboard-statistics";
  const token = getAuthToken();
  const body = { statistics: payloadItems };

  try {
    console.log("[Dashboard] Statistics request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      body,
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch { }

  const response = await authApiClient.post<DashboardStatisticsResponse>(endpoint, body, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
  try { console.log("[Dashboard] Statistics response", response); } catch { }
  return response;
}
