import axios from "axios";

// export const baseURL = "https://lead.veblika.com/api";
let authorization;

if (typeof window !== "undefined" && window.localStorage) {
  authorization = localStorage.getItem("authorization");
}

export const baseURL = "http://localhost:8000/api";
// export const baseURL = "http://192.168.1.13:8009/api";

export const clientUrl = "http://localhost:3000";

export const Imageapi = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
