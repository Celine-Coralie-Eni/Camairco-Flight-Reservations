import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        👤 Welcome, {user?.username || "Guest"}!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Role: {user?.role || "USER"}
      </Typography>
    </Box>
  );
}
