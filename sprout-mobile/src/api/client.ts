import axios from "axios";
import Constants from "expo-constants";

const baseURL =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ||
  (Constants as any).manifest?.extra?.EXPO_PUBLIC_API_URL ||
  "http://localhost:8000";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
