import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import RegisterPage from "./pages/RegisterPage";
import ReservationsPage from "./pages/ReservationsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Typewriter from "typewriter-effect";
import ProfilePage from "./pages/ProfilePage"; // add this at the top

// Fonts
import "@fontsource/pacifico";
import "@fontsource/dancing-script";

function Home() {
  return (
    <Box textAlign="center" mt={6}>
      <span
        style={{ fontSize: 80, display: "inline-block", marginBottom: 8 }}
        role="img"
        aria-label="plane"
      >
        🛫
      </span>
      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        sx={{
          fontFamily: "Pacifico, cursive",
          fontWeight: 700,
          fontSize: { xs: 32, sm: 48 },
        }}
      >
        <Typewriter
          options={{
            strings: ["Welcome to Camairco Flight Reservations"],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 30,
            pauseFor: 2000,
          }}
        />
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Dancing Script, cursive",
          color: "#8e24aa",
          fontStyle: "italic",
          letterSpacing: 1,
          fontSize: { xs: 20, sm: 24 },
          mt: 1,
        }}
      >
        Book your next adventure with style!
      </Typography>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#ff9800" },
          background: {
            default: mode === "light" ? "#f4f8fb" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: "Poppins, Roboto, Arial, sans-serif",
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 15px rgba(25, 118, 210, 0.4)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                  boxShadow: "none",
                },
                "&:focus-visible": {
                  outline: "2px solid #1976d2",
                  outlineOffset: 2,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary" elevation={3}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontFamily: "Pacifico, cursive",
                fontWeight: 700,
                fontSize: { xs: 24, sm: 28 },
                display: "flex",
                alignItems: "center",
                color: "#fff",
              }}
            >
              🚀 Camairco
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/reservations">
              Reservations
            </Button>

            {localStorage.getItem("user") ? (
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}

            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={() =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
              }
              aria-label="toggle light/dark mode"
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />{" "}
            {/* Open to all */}
            <Route
              path="/reservations"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ReservationsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
