import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ adminOnly = false, children }) {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);

  if (adminOnly && user.role !== "ADMIN") {
    // Logged in but not admin
    return (
      <div style={{ padding: 20, textAlign: "center", color: "red" }}>
        🔐 Access Denied <br />
        Only admin users can view reservations.
      </div>
    );
  }

  // Allowed to view the page
  return children;
}
