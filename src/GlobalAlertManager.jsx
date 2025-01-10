import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Snackbar, Alert } from "@mui/material";

// Singleton to hold the global alert function
let globalAlert;

const GlobalAlertManager = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "info", // 'success', 'error', 'warning', 'info'
  });

  const showAlert = (message, severity = "info") => {
    setAlertState({ open: true, message, severity });
  };

  const handleAlertClose = () => {
    setAlertState({ ...alertState, open: false });
  };

  // Assign global alert function
  globalAlert = showAlert;

  return createPortal(
    <Snackbar
      open={alertState.open}
      autoHideDuration={3000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleAlertClose}
        severity={alertState.severity}
        sx={{ width: "100%" }}
      >
        {alertState.message}
      </Alert>
    </Snackbar>,
    document.body
  );
};

// Export the global alert function
export const useGlobalAlert = () => globalAlert;

export default GlobalAlertManager;
