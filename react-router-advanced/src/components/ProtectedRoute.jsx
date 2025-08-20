import React from "react";
import { Navigate } from "react-router-dom";

// Simulated authentication
const isAuthenticated = false; // toggle to true to test access

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
