import React, { useEffect } from "react";
import Local from "../helpers/Local";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = Local.getToken() !== "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  return children;
}
