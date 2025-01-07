import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ThemeProvider from "./ThemeProvider";
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              LLM-powered News Notification System
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
