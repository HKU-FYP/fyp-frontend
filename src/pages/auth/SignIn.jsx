import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { existUserStock } from "../../api/user";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post("http://localhost:8888/api/v1/login", {
        username,
        password,
      });

      const { access_token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", access_token);

      // Navigate to a protected route or dashboard
      const exist = await existUserStock();
      console.log("exist:", exist);
      if (exist) {
        navigate("/dashboard");
      } else {
        navigate("/stock-input");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail || "Login failed");
      } else {
        setError("Unable to connect to the server");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/signup")}
          sx={{ mt: 2 }}
        >
          Don’t have an account? Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default SignIn;
