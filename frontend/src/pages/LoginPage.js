import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4, borderRadius: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setTimeout(() => {
            const isAdmin =
              values.username === "admin" && values.password === "admin123";
            localStorage.setItem(
              "user",
              JSON.stringify({
                username: values.username,
                role: isAdmin ? "ADMIN" : "USER",
              })
            );
            setStatus({ success: "Login successful!" });
            window.location.href = "/profile";
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          isSubmitting,
          status,
        }) => (
          <Form>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">📧</InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">🔒</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {status?.success && (
              <Typography color="success.main" sx={{ mt: 2 }}>
                {status.success} ✅
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: 16,
                borderRadius: 3,
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #1565c0, #2196f3)",
                  transform: "scale(1.03)",
                },
              }}
            >
              🔐 Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
