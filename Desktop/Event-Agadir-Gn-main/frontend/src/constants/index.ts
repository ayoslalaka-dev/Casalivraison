import Constants from "expo-constants";
function resolveBaseUrl() {
  const host = Constants.expoConfig?.hostUri?.split(":")?.[0];
  if (host && /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return `http://${host}:3000/api`;
  }
  return "https://nonformatively-hydric-gaynell.ngrok-free.dev/api";
}
export const API_BASE_URL = resolveBaseUrl();

