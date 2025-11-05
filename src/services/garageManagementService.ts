import { authApiClient } from "../lib/api_client/api_client";
import { buildApiUrl } from "../lib/api_client/config";

export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  has_more: boolean;
  first: string | null;
  prev: string | null;
  next: string | null;
  last: string | null;
  data: T[];
}

// ====== Garage Account Models ======
export interface GarageState {
  id: number;
  state_id: string;
  acc_id: string;
  doer_acc_id: string;
  gra_id: string;
  note: string | null;
  reason: string | null;
  state_code: string | null;
  state_name: string | null;
  time_period: string | null;
  created_at: string;
  updated_at: string;
}

export interface GarageMediaFile {
  id: number;
  acc_media_id: string;
  acc_id: string;
  gra_id: string | null;
  sub_ven_id: string | null;
  vend_id: string | null;
  file_name: string;
  file_path: string;
  file_size: number;
  media_type: string;
  upload_date: string;
  state_id: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface GarageSubStatistic {
  file_count: number;
  state_count: number;
}

export interface Garage {
  id: number;
  gra_id: string;
  acc_id: string;
  garage_email: string;
  business_phone: string;
  garage_name: string;
  garage_location: string;
  country: string;
  location: string;
  long: string;
  lat: string;
  iAgreeToTerms: boolean;
  state_id: string | null;
  files_id_array: string | null;
  created_at: string;
  updated_at: string;
  sub_statistic: GarageSubStatistic;
  media_files: GarageMediaFile[];
  garage_state: GarageState[];
}

export interface GarageAccount {
  acc_id: string;
  action_state_id: string | null;
  email: string;
  phone: string;
  account_type: string;
  access_array: any;
  system_state_id: string;
  firstName: string;
  lastName: string;
  profile_url: string | null;
  created_at: string;
  updated_at: string;
  email_hash: string;
  garage: Garage[];
}

// ====== API Response Envelope ======
interface GarageAccountEnvelope {
  success: boolean;
  data: {
    current_page: number;
    data: GarageAccount[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

function getAuthToken(): string | undefined {
  try {
    return localStorage.getItem("authToken") || undefined;
  } catch {
    return undefined;
  }
}

export async function fetchGarageAccounts(
  page: number = 1,
  perPage: number = 15
): Promise<PaginatedResponse<GarageAccount>> {
  const endpoint = "/public/api/garage_account";
  const token = getAuthToken();

  // Build query string with page and per_page parameters
  const qs = `?page=${encodeURIComponent(page)}&per_page=${encodeURIComponent(perPage)}`;

  try {
    console.log("[Garage] Fetch garage accounts request", {
      method: "GET",
      url: buildApiUrl(`${endpoint}${qs}`),
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch {}

  const raw = await authApiClient.post<GarageAccountEnvelope>(
    `${endpoint}${qs}`,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );

  const p = raw?.data;
  const mapped: PaginatedResponse<GarageAccount> = {
    status: Boolean(raw?.success),
    message: "",
    total: p?.total ?? 0,
    per_page: p?.per_page ?? perPage,
    current_page: p?.current_page ?? page,
    last_page: p?.last_page ?? 1,
    from: p?.from ?? 0,
    to: p?.to ?? 0,
    has_more: Boolean(p?.next_page_url),
    first: p?.first_page_url ?? null,
    prev: p?.prev_page_url ?? null,
    next: p?.next_page_url ?? null,
    last: p?.last_page_url ?? null,
    data: p?.data ?? [],
  };

  try {
    console.log("[Garage] Fetch garage accounts mapped", mapped);
  } catch {}
  return mapped;
}

// ====== Garage Approve API ======
export interface GarageApprovePayload {
  gra_id: string;
  staff_id: string;
  state_name: string;
  reason: string;
  note: string;
}

export interface GarageApproveResponse {
  status: boolean;
  message: string;
  data: {
    gra_id: string;
    state_id: string;
    state_name: string;
  };
}

export async function approveGarage(payload: GarageApprovePayload): Promise<GarageApproveResponse> {
  const endpoint = "/public/api/garage_approve";
  const token = getAuthToken();

  try {
    console.log("[Garage] Approve garage request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      body: payload,
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch {}

  const response = await authApiClient.post<GarageApproveResponse>(
    endpoint,
    payload,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );

  try {
    console.log("[Garage] Approve garage response", response);
  } catch {}
  return response;
}

// ====== Dashboard Statistics API ======
export interface DashboardStatisticsPayload {
  staff_id: string;
  sta_goal: string;
}

export interface GarageFigCard {
  total_requests: number;
  avg_total_contact_ratio: number;
  avg_total_requests_submitted: number;
  total_garages_active: number;
}

export interface DashboardStatisticsData {
  staff_id: string;
  goal: string;
  garage_fig_card: GarageFigCard;
}

export interface DashboardStatisticsResponse {
  status: boolean;
  message: string;
  data: DashboardStatisticsData[];
}

export async function fetchDashboardStatistics(
  staffId: string,
  staGoal: string = "garage fig card"
): Promise<DashboardStatisticsResponse> {
  const endpoint = "/public/api/statistics/dashboard-statistics";
  const token = getAuthToken();

  const payload = {
    statistics: [
      {
        staff_id: staffId,
        sta_goal: staGoal
      }
    ]
  };

  try {
    console.log("[Garage] Dashboard statistics request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      body: payload,
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch {}

  const response = await authApiClient.post<DashboardStatisticsResponse>(
    endpoint,
    payload,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );

  try {
    console.log("[Garage] Dashboard statistics response", response);
  } catch {}

  return response;
}

