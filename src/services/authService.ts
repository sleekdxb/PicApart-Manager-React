import { authApiClient } from "../lib/api_client/api_client";
import { buildApiUrl } from "../lib/api_client/config";

export interface Staff {
  id: number;
  staff_id: string;
  first_name: string;
  last_name: string;
  work_email: string;
  password: string;
  job_title: string | null;
  phone: string | null;
  passport_number: string | null;
  passport_expire_date: string | null;
  salary: string | null;
  working_shift: string | null;
  department: string | null;
  job_description: string | null;
  shift_start_time: string | null;
  shift_end_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface StaffLoginPayload {
  work_email: string;
  password: string;
}

export interface StaffLoginResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    expires_at: string;
    staff: Staff;
  };
}

export interface StaffLogoutResponse {
  status: boolean;
  message: string;
}

const AUTH_STORAGE_KEY = "staffAuth";
const AUTH_TOKEN_KEY = "authToken";

export async function loginStaff(payload: StaffLoginPayload): Promise<StaffLoginResponse> {
  const endpoint = "/public/api/staff-login";
  try {
    console.log("[Auth] Staff login request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      payload: { work_email: payload.work_email, password: "***" },
    });
  } catch { }

  const response = await authApiClient.post<StaffLoginResponse>(endpoint, payload);

  try {
    console.log("[Auth] Staff login response", response);
  } catch { }

  return response;
}


// export async function loginStaff(payload: StaffLoginPayload): Promise<StaffLoginResponse> {
//   // Direct endpoint (temporary, bypassing buildApiUrl)
//   const endpoint = "http://api-magangment-service.pick-a-part.ca/public/api/staff-login";

//   // Replace <> with your actual Bearer token or keep empty if not required
//   const token = "<>";

//   try {
//     console.log("[Auth] Staff login request (direct)", {
//       method: "POST",
//       url: endpoint,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       payload: { work_email: payload.work_email, password: "***" },
//     });
//   } catch {}

//   // Make POST request with the exact same headers
//   const response = await authApiClient.post<StaffLoginResponse>(
//     endpoint,
//     payload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   try {
//     console.log("[Auth] Staff login response (direct)", response);
//   } catch {}

//   return response;
// }



export async function logoutStaff(): Promise<StaffLogoutResponse> {
  const endpoint = "/public/api/staff-logout";
  const token = (() => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY) || undefined;
    } catch {
      return undefined;
    }
  })();

  try {
    console.log("[Auth] Staff logout request", {
      method: "POST",
      url: buildApiUrl(endpoint),
      headers: { Authorization: token ? "Bearer ***" : undefined },
    });
  } catch { }

  const response = await authApiClient.post<StaffLogoutResponse>(
    endpoint,
    undefined,
    token
      ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      : undefined
  );

  try {
    console.log("[Auth] Staff logout response", response);
  } catch { }

  return response;
}

export function persistAuth(response: StaffLoginResponse): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response));
    localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
  } catch {
    // storage might be unavailable (private mode); ignore
  }
}

export function clearAuth(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // ignore
  }
}

export function getStoredAuth(): StaffLoginResponse | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StaffLoginResponse) : null;
  } catch {
    return null;
  }
}


