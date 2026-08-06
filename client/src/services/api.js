import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";

// Single axios instance with credentials always enabled
const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

// Interceptor to inject JWT token if cookies are blocked by browser third-party policies
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

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await api.get("/api/user/currentuser");
    dispatch(setUserData(result.data.user));
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await api.post("/api/notes/generate-notes", payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getUserHistory = async () => {
  try {
    const result = await api.get("/api/notes/history");
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const toggleShareNotes = async (id, isPublic) => {
  try {
    const result = await api.post(`/api/notes/share/${id}`, { isPublic });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getSharedNotes = async (shareId) => {
  try {
    const result = await api.get(`/api/notes/shared/${shareId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};