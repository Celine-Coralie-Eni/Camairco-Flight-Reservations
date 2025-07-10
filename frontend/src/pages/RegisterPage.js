import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    password: "",
    kickoffAddress: "",
    destinationAddress: "",
    flightDateTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:8080/reservations", formData);
      setMessage("✅ Reservation successfully created!");
      setFormData({
        passengerName: "",
        // email: "",
        // password: "",
        kickoffAddress: "",
        destinationAddress: "",
        flightDateTime: "",
      });
    } catch (error) {
      setMessage("❌ Failed to create reservation. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 6,
        maxWidth: 500,
        mx: "auto",
        px: 3,
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontFamily: "Poppins, cursive",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
          mb: 3,
        }}
      >
        ✈️ Book a Flight!
      </Typography>

      <TextField
        name="passengerName"
        label="Passenger Name"
        fullWidth
        margin="normal"
        value={formData.passengerName}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">👤</InputAdornment>,
        }}
      />

      {/* <TextField
        name="email"
        label="Email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">📧</InputAdornment>,
        }}
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
        }}
      /> */}

      <TextField
        name="kickoffAddress"
        label="Kickoff Address"
        fullWidth
        margin="normal"
        value={formData.kickoffAddress}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">📍</InputAdornment>,
        }}
      />

      <TextField
        name="destinationAddress"
        label="Destination Address"
        fullWidth
        margin="normal"
        value={formData.destinationAddress}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🛬</InputAdornment>,
        }}
      />

      <TextField
        name="flightDateTime"
        label="Flight Date & Time"
        type="datetime-local"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formData.flightDateTime}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🕒</InputAdornment>,
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{
          mt: 2,
          borderRadius: 3,
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 15px rgba(25, 118, 210, 0.4)",
          },
          "&:active": {
            transform: "scale(0.98)",
            boxShadow: "none",
          },
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Register"}
      </Button>

      {message && (
        <Typography mt={2} color={message.startsWith("✅") ? "green" : "error"}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
