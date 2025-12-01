import axios from "axios";

// ambil token dari localStorage
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:3003",  // BACKEND KAMU
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// interceptor: update token jika berubah
instance.interceptors.request.use((config) => {
  const newToken = localStorage.getItem("token");
  if (newToken) {
    config.headers.Authorization = `Bearer ${newToken}`;
  }
  return config;
});

// interceptor: handle error
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // jika token tidak valid / expired
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect ke login
    }
    return Promise.reject(error);
  }
);

export default instance;
