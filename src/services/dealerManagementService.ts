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

// ====== Nested models (exactly as API returns; includes snake_case) ======
export interface Session {
  id: number;
  session_id: string;
  acc_id: string;
  end_time: string | null;
  ip_address: string | null;
  is_active: boolean;
  last_accessed: string | null;
  session_data: string | null;
  start_time: string | null;
  life_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface AccountState {
  id: number;
  state_id: string;
  acc_id: string;
  doer_acc_id: string;
  note: string | null;
  reason: string | null;
  state_code: string | null;
  state_name: string | null;
  time_period: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaFile {
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
  state: string[];
}

export interface VendorState {
  id: number;
  state_id: string;
  acc_id: string;
  doer_acc_id: string;
  vend_id: string;
  note: string | null;
  reason: string | null;
  state_code: string | null;
  state_name: string | null;
  time_period: string | null;
  created_at: string;
  updated_at: string;
}

export interface VendorSubStatistic {
  login?: number | string;
  request_part_count?: number | string;
  total_match?: number | string;
  chat_call_count?: number | string;
  contact_rate?: number | string;
  last_active?: string;
  [key: string]: unknown;
}

export interface Vendor {
  id: number;
  acc_id: string;
  vend_id: string;
  address: string | null;
  business_name: string | null;
  location: string | null;
  long: string | null;
  lat: string | null;
  country: string | null;
  official_email: string | null;
  official_phone: string | null;
  owner_id_number: string | null;
  owner_id_full_name: string | null;
  trade_license_number: string | null;
  profile_doc_state_array_id: string | null;
  state_position: string | null;
  state_id: string | null;
  is_owner?: number;
  i_admit_not_owner?: number;
  profile_state_label?: string | null;
  files_id_array?: string[];
  main?: number;
  total_listing?: number;
  TotalListingRequested?: number;
  total_listing_conver?: number | null;
  listing_performance?: Record<string, unknown>;
  total_imperssions?: number;
  total_clikcs?: number;
  total_branches?: number;
  created_at: string;
  updated_at: string;
  vendor_state?: VendorState[];
  media_files?: MediaFile[];
  sub_statistic?: VendorSubStatistic;
}

export interface Payment {
  id: number;
  acc_id: string;
  transaction_id: string;
  amount: string;
  currency: string;
  payment_id: string;
  status: string;
  card_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: number;
  memb_id: string;
  transaction_id: string;
  acc_id: string;
  start_date: string;
  end_date: string;
  type: string;
  status: string;
  allowance_level: number | null;
  created_at: string;
  updated_at: string;
  payments?: Payment[];
}

export interface Amendment {
  id: number;
  staff_id: string | null;
  acc_id: string;
  amendment_type: string;
  change_request: string | null;
  original_data: string | null;
  updated_data: string | null;
  status: string | null;
  notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  reference_id: string | null;
  reference_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface Account {
  acc_id: string;
  action_state_id: string | null;
  email: string | null;
  phone: string | null;
  account_type: string | null;
  access_array?: any;
  system_state_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profile_url?: string | null;
  created_at: string;
  updated_at: string;
  session?: Session[];
  account_states?: AccountState[];
  vendor?: Vendor[];
  memberships?: Membership[];
  amendment?: Amendment[];
}

function getAuthToken(): string | undefined {
  try {
    return localStorage.getItem("authToken") || undefined;
  } catch {
    return undefined;
  }
}

export async function fetchAccounts(perPage: number, page: number): Promise<PaginatedResponse<Account>> {
  const endpoint = "/public/api/account";
  const token = getAuthToken();

  try {
    console.log("[Dealer] Fetch accounts request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      body: { per_page: perPage, page },
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch { }

  const response = await authApiClient.post<PaginatedResponse<Account>>(
    endpoint,
    { per_page: perPage, page },
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );

  try { console.log("[Dealer] Fetch accounts response", response); } catch { }
  return response;
}

// -------- Pending Accounts (Approvals) --------
interface PendingEnvelope<T> {
  success: boolean;
  data: {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
}

export async function fetchPendingAccounts(perPage: number, page: number): Promise<PaginatedResponse<Account>> {
  const endpoint = "/public/api/pending_account";
  const token = getAuthToken();

  // Build query string (API supports page; include per_page if honored)
  const qs = `?page=${encodeURIComponent(page)}${perPage ? `&per_page=${encodeURIComponent(perPage)}` : ''}`;

  try {
    console.log("[Dealer] Fetch pending accounts request", {
      method: "GET",
      url: buildApiUrl(`${endpoint}${qs}`),
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch { }

  const raw = await authApiClient.post<PendingEnvelope<Account>>(`${endpoint}${qs}`, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);

  const p = raw?.data;
  const mapped: PaginatedResponse<Account> = {
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

  try { console.log("[Dealer] Fetch pending accounts mapped", mapped); } catch { }
  return mapped;
}

export interface UpdateVendorAccountProfilePayload {
  staff_id: string;
  account: {
    acc_id: string;
    email: string | null;
    phone: string | null;
    account_type: string | null;
    firstName?: string | null;
    lastName?: string | null;
  };
  vendor?: {
    vend_id: string;
  };
  vendor_state: {
    note: string;
    reason: string;
    state_code: string;
    state_name: string;
  };
  file_state: Array<{
    acc_media_id: string;
    note: string;
    reason: string;
    state_code: string;
    state_name: string;
  }>;
  account_state: {
    note: string;
    reason: string;
    state_code: string;
    state_name: string;
  };
}

export async function updateVendorAccountProfile(payload: UpdateVendorAccountProfilePayload) {
  const endpoint = "/public/api/update-vendor-account-profile";
  const token = getAuthToken();
  try {
    console.log("[Dealer] Update vendor account profile request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      body: payload,
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch { }

  const response = await authApiClient.post(endpoint, payload, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
  try { console.log("[Dealer] Update vendor account profile response", response); } catch { }
  return response;
}

// ====== Dealer Statistics ======
export interface DealerStatisticsRequestItem {
  staff_id: string;
  sta_goal: string; // e.g., 'scoring'
}

export interface DealerActivity {
  total_requests: number;
  match_rate: number;
  contact_rate: number;
  logins: string;
}

export interface DealerScoring {
  "Listing Quality": number;
  "Responsiveness": number;
  "Engagement": number;
  "Stock Update Rate": number;
}

export interface TopDealer {
  vendor_id: string;
  vendor_name: string;
  email: string;
  activity: DealerActivity;
  scoring: DealerScoring;
}

export interface DealerStatisticsDataItem {
  staff_id: string;
  goal: string;
  top_dealers: TopDealer;
  scoring?: DealerScoring;
}

export interface DealerStatisticsResponse {
  status: boolean;
  message: string;
  data: DealerStatisticsDataItem[];
}

export async function fetchDealerStatistics(staffId: string): Promise<DealerStatisticsResponse> {
  const endpoint = "/public/api/statistics/dashboard-statistics";
  const token = getAuthToken();
  const body = {
    statistics: [
      {
        staff_id: staffId,
        sta_goal: "scoring"
      }
    ]
  };

  try {
    console.log("[Dealer] Fetch dealer statistics request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      body,
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch { }

  const response = await authApiClient.post<DealerStatisticsResponse>(
    endpoint,
    body,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );
  
  try { console.log("[Dealer] Fetch dealer statistics response", response); } catch { }
  return response;
}


