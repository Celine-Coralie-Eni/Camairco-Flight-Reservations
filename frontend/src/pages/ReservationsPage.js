import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState({
    kickoffAddress: "",
    destinationAddress: "",
    flightDateTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [userRole, setUserRole] = useState("USER");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "ADMIN") {
      setUserRole("ADMIN");
      fetchReservations();
    }
  }, []);

  const fetchReservations = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/reservations", {
        params,
      });
      setReservations(response.data);
    } catch (error) {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchReservations(search);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/reservations/${deleteId}`);
      fetchReservations(search);
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  if (userRole !== "ADMIN") {
    return (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          🔐 Access Denied
        </Typography>
        <Typography variant="body1">
          Only admin users can view reservations.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, maxWidth: 900, mx: "auto", px: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
          mb: 3,
        }}
      >
        All Reservations
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Kickoff Address"
          value={search.kickoffAddress}
          onChange={(e) =>
            setSearch((s) => ({ ...s, kickoffAddress: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightTakeoffIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          sx={{ minWidth: 220, flexGrow: 1, borderRadius: 3 }}
        />
        <TextField
          label="Destination Address"
          value={search.destinationAddress}
          onChange={(e) =>
            setSearch((s) => ({ ...s, destinationAddress: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightLandIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          sx={{ minWidth: 220, flexGrow: 1, borderRadius: 3 }}
        />
        <TextField
          label="Flight Date & Time"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={search.flightDateTime}
          onChange={(e) =>
            setSearch((s) => ({ ...s, flightDateTime: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          sx={{ minWidth: 220, flexGrow: 1, borderRadius: 3 }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
          sx={{ minWidth: 120, borderRadius: 3 }}
        >
          Search
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#222" : "#fafafa",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06) !important",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#333" : "#e3f2fd",
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Kickoff Address</TableCell>
              <TableCell>Destination Address</TableCell>
              <TableCell>Flight Date & Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
            {reservations.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.passengerName}</TableCell>
                <TableCell>{r.kickoffAddress}</TableCell>
                <TableCell>{r.destinationAddress}</TableCell>
                <TableCell>
                  {r.flightDateTime
                    ? new Date(r.flightDateTime).toLocaleString()
                    : ""}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => confirmDelete(r.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reservation? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
