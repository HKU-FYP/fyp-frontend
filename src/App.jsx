import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignIn from "./pages/auth/SignIn";
// import SignUp from "./pages/auth/SignUp";
import SignUp from "./pages/sign-up/SignUp";
import StockInput from "./pages/stockinput/StockInput";
import ThemeProvider from "./ThemeProvider";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { GlobalProvider } from "./GlobalContext";
import GlobalAlertManager from "./GlobalAlertManager";
// import SignInSide from "./pages/sign-in-side/SignInSide.jsx";
import SignInSide from "./pages/sign-in-side/SignInSide.tsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import NewsDetail from "./pages/dashboard/components/NewsDetail.jsx";

function App() {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Router>
          <GlobalAlertManager />
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                LLM-powered News Notification System
              </Typography>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/signin" element={<SignInSide />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/stock-input" element={<StockInput />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/dashboard/news" element={<NewsDetail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
