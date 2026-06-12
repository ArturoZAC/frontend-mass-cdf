import axios from "axios";
import { getEnvs } from "../helpers/get-envs";

const { BASE_URL } = getEnvs();

// console.log({ BASE_URL });

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
