import axios from "axios";

// Base URLs - matching your Django server
const BASE_URL = "http://localhost:8140";
// const BASE_URL = "http://dev.deelflowai.com:8140";
const API_BASE_URL = `${BASE_URL}/api`;

// Create a single API instance for all requests
const api = axios.create({
  baseURL: API_BASE_URL, // Use base URL without /api prefix
  withCredentials: true,
  credentials: "include", // 👈 REQUIRED for session cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const AllPOSTHeader = axios.create({
  baseURL: BASE_URL, // Use base URL without /api prefix
  // withCredentials: true,
  // credentials: "include", // 👈 REQUIRED for session cookies
  // method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   // Clear stored auth data
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");

    //   // Redirect to login page
    //   if (window.location.pathname !== "/login") {
    //     window.location.href = "/login";
    //   }
    // }
    return Promise.reject(error);
  }
);

// Request interceptor to add JWT token
AllPOSTHeader.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle authentication errors
AllPOSTHeader.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API - Fixed URLs to match your Django urls.py
export const authAPI = {
  login: (credentials) => AllPOSTHeader.post("/api/auth/login", credentials), // Matches your URL pattern
  register: (userData) => AllPOSTHeader.post("/api/auth/register", userData), // Matches your URL pattern
  logout: () => api.post("/logout/"),
  getCurrentUser: () => api.get("/user/"),
  getAllUsers: () => api.get("/users/"),
  invite: (data) => api.post("/invitations/", data),
  getInvitation: (invitationtoken) =>
    api.get(`/validate-invitation/?token=${invitationtoken}`),
  inviteeRegister: (userData) => api.post("/invitee-register/", userData),
};

export const PaymentAPI = {
  getSubscriptionPack: () => AllPOSTHeader.get(`/subscription-packs/`),
  createCheckout: (id) => AllPOSTHeader.post(`/create-checkout-session/`, id),
  createCustomerPortal: () =>
    AllPOSTHeader.post(`/create-customer-portal-session/`),
  getTransactionList: () => AllPOSTHeader.post(`/stripe-invoice/`),
  getCurrentPack: () => AllPOSTHeader.get(`/current-subscription/`),
};

export const propertiesAPI = {
  getProperties: (params) => api.get("/properties/", { params }),
  getProperty: (id) => api.get(`/properties/${id}/`),
  createProperty: (data) => api.post("/properties/", data),
  updateProperty: (id, data) => api.put(`/properties/${id}/`, data),
  deleteProperty: (id) => api.delete(`/properties/${id}/`),
  getAIAnalysis: (id) => api.get(`/properties/${id}/ai-analysis/`),

  getCombinedProperties: (params) =>
    api.get("/properties/combined", { params }),
};

export default api;
