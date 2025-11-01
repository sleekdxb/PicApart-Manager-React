// ==============================================
// API CLIENT (Axios wrapper)
// Minimal, centralized HTTP client for auth flows
// ==============================================

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './config';

interface ApiClientOptions {
  baseUrl?: string;
  enableLogging?: boolean; // dev-only console logging of requests/responses
}

export class ApiClient {
  private readonly instance: AxiosInstance;
  private readonly enableLogging: boolean;

  constructor(options?: ApiClientOptions) {
    this.instance = axios.create({
      baseURL: options?.baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });

    // Enable logging in development by default, can be overridden via options
    this.enableLogging = options?.enableLogging ?? Boolean((import.meta as any).env?.DEV);

    // Request interceptor - log outgoing requests in dev
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (this.enableLogging) {
        try {
          const base = config.baseURL || this.instance.defaults.baseURL || '';
          const url = `${base || ''}${config.url || ''}`;
          // Clone shallow to avoid circular refs in console
          const headers = config.headers ? { ...config.headers } : undefined;
          console.log('[API Request]', {
            method: (config.method || 'GET').toUpperCase(),
            url,
            headers,
            data: config.data,
          });
        } catch {
          // no-op
        }
      }
      return config;
    });

    // Response interceptor to normalize errors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.enableLogging) {
          try {
            const base = response.config.baseURL || this.instance.defaults.baseURL || '';
            const url = `${base || ''}${response.config.url || ''}`;
            console.log('[API Response]', {
              url,
              status: response.status,
              data: response.data,
            });
          } catch {
            // no-op
          }
        }
        return response;
      },
      (error: AxiosError) => {
        if (this.enableLogging) {
          try {
            const base = error?.config?.baseURL || this.instance.defaults.baseURL || '';
            const url = `${base || ''}${error?.config?.url || ''}`;
            console.log('[API Error]', {
              url,
              status: error?.response?.status,
              data: error?.response?.data,
              message: error?.message,
            });
          } catch {
            // no-op
          }
        }
        const data = (error?.response?.data as any);
        let message: string = (error?.message as string) || 'Request failed';

        // Prefer field-level validation messages if present
        if (data && data.errors && typeof data.errors === 'object') {
          for (const key of Object.keys(data.errors)) {
            const arr = data.errors[key];
            if (Array.isArray(arr) && arr.length > 0) {
              message = arr[0];
              break;
            }
          }
        } else if (data && typeof data.message === 'string' && data.message.trim().length > 0) {
          message = data.message;
        }

        const enhancedError: any = new Error(message);
        enhancedError.status = error?.response?.status;
        enhancedError.data = data;
        return Promise.reject(enhancedError);
      }
    );
  }

  // =========== HTTP HELPERS ==========
  public get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(path, config).then((r: AxiosResponse<T>) => r.data);
  }

  public post<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(path, body, config).then((r: AxiosResponse<T>) => r.data);
  }

  public put<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(path, body, config).then((r: AxiosResponse<T>) => r.data);
  }

  public patch<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch<T>(path, body, config).then((r: AxiosResponse<T>) => r.data);
  }

  public delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(path, config).then((r: AxiosResponse<T>) => r.data);
  }
}

// -------- Environment-aware base URL resolution (staging / live) --------
function resolveRuntimeEnv(): string {
  const env: any = (import.meta as any).env || {};
  const mode = env.MODE || env.VITE_MODE; // vite's build mode (development/production)
  const runtime = env.VITE_RUNTIME_ENV || env.VITE_ENV || env.VITE_STAGE; // custom markers: staging, production, live, dev
  const host = typeof window !== 'undefined' ? window.location.hostname : '';

  // If an explicit runtime is provided, prefer it
  if (typeof runtime === 'string' && runtime.trim().length > 0) {
    return runtime.toLowerCase();
  }

  // Infer from hostname heuristics
  if (host.includes('localhost') || host.includes('127.0.0.1')) return 'development';
  if (host.includes('staging') || host.startsWith('stg-') || host.includes('-stg-')) return 'staging';

  // Fallback to vite mode
  if (typeof mode === 'string' && mode.length > 0) return mode.toLowerCase();
  return 'production';
}

function resolveAuthBaseUrl(): string {
  const env: any = (import.meta as any).env || {};
  const runtime = resolveRuntimeEnv();

  // Order of precedence:
  // 1) Explicit override VITE_AUTH_BASE_URL
  // 2) Runtime-specific envs
  // 3) Safe default (live) fallback
  const explicit = env.VITE_AUTH_BASE_URL;
  if (explicit && typeof explicit === 'string' && explicit.trim().length > 0) {
    return explicit;
  }

  if (runtime === 'staging' || runtime === 'stage' || runtime === 'stg') {
    const stg = env.VITE_AUTH_BASE_URL_STAGING || env.VITE_AUTH_BASE_URL_STAGE || env.VITE_AUTH_BASE_URL_STG;
    if (stg && typeof stg === 'string' && stg.trim().length > 0) return stg;
  }

  if (runtime === 'production' || runtime === 'prod' || runtime === 'live') {
    const prod = env.VITE_AUTH_BASE_URL_PROD || env.VITE_AUTH_BASE_URL_LIVE;
    if (prod && typeof prod === 'string' && prod.trim().length > 0) return prod;
  }

  // Development default (can still be the live endpoint if desired)
  if (runtime === 'development' || runtime === 'dev') {
    const dev = env.VITE_AUTH_BASE_URL_DEV || env.VITE_AUTH_BASE_URL_STAGING || env.VITE_AUTH_BASE_URL;
    if (dev && typeof dev === 'string' && dev.trim().length > 0) return dev;
  }

  // Final fallback: use our project config default (staging/production switch)
  return API_BASE_URL;
}

// Dedicated auth client (separate base URL)
export const authApiClient = new ApiClient({
  baseUrl: resolveAuthBaseUrl(),
});


