// import axios from "axios";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";

// export const getCurrentUser = async (dispatch) => {
//   try {
//     const result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true });
//     console.log(result.data);
//     dispatch(setUserData(result.data.user));
//   } catch (error) {
//     console.log("Error fetching current user:", error);
//   }
// };

// export const generateNotes = async (payload) => {
//   try {
//     const result = await axios.post(serverUrl + "/api/notes/generate-notes", payload, { withCredentials: true });
//     console.log(result.data);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getUserHistory = async () => {
//     try {
//         const result = await axios.get(serverUrl + "/api/notes/history", { withCredentials: true });
//         return result.data;
//     } catch (error) {
//         console.log(error);
//     }
// };


import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";
axios.defaults.withCredentials = true; // 👈 belongs here
// 👇 Create a single axios instance with credentials always enabled
const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true, // sends cookies automatically with every request
});

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await api.get("/api/user/currentuser");
    console.log(result.data);
    dispatch(setUserData(result.data.user));
  } catch (error) {
    console.log("Error fetching current user:", error);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await api.post("/api/notes/generate-notes", payload);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // 👈 throw so TopicForm.jsx catch block actually triggers
  }
};

export const getUserHistory = async () => {
  try {
    const result = await api.get("/api/notes/history");
    return result.data;
  } catch (error) {
    console.log(error);
    throw error; // 👈 same here
  }
};