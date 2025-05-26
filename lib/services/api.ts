import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  //   headers: {
  // "Content-Type": "application/json",
  // "ngrok-skip-browser-warning": "test",

  // "Cache-Control": "no-cache, no-store, must-revalidate",
  // "Pragma": "no-cache",
  // "Expires": "0"
  //   },
});

export default api;
