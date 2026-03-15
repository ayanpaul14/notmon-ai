import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
export const serverUrl = "https://notmon-ai.onrender.com";
import axios from "axios";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const userData = useSelector((state) => state?.user?.userData);

  console.log(userData);

  return (
    <Routes>

      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/auth" replace />}
      />

      <Route
        path="/auth"
        element={userData ? <Navigate to="/" replace /> : <Auth />}
      />

      <Route
        path="/history"
        element={userData ? <History /> : <Navigate to="/auth" replace />}
      />

      <Route
        path="/notes"
        element={userData ? <Notes /> : <Navigate to="/auth" replace />}
      />

      <Route
        path="/pricing"
        element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
      />

    </Routes>
  );
}
axios.defaults.withCredentials = true;
export default App;