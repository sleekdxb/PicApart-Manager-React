// Change this one variable to switch environments
type ApiEnv = 'staging' | 'production';
export const API_ENV: ApiEnv = 'staging';

const BASE_URLS: Record<ApiEnv, string> = {
  staging: 'http://test-api-magangment-service.pick-a-part.ca',
  production: 'http://api-magangment-service.pick-a-part.ca',
};

export const API_BASE_URL = BASE_URLS[API_ENV];

export function buildApiUrl(path: string): string {
  const normalizedBase = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}


