import axios from "axios";
import { BACKEND_URL } from "./constant";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});