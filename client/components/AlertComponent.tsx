"use client";
import { useAlertStore } from "@/zustand/stores/alert-store";
import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const AlertComponent = () => {
  const { errors, success, clearSuccess, clearErrors } = useAlertStore(
    (state) => state
  );
  const [isOpenSuccess, setOpenSuccess] = useState(false);
  const [isOpenErrors, setOpenErrors] = useState(false);

  useEffect(() => {
    if (success) {
      setOpenSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    if (errors.length > 0) {
      setOpenErrors(true);
    }
  }, [errors.length]);

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
    clearSuccess();
  };

  const handleCloseErrors = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenErrors(false);
    clearErrors();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={isOpenErrors}
        onClose={handleCloseErrors}
      >
        <div>
          {errors.map((error) => (
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%", mb: 1 }}
              key={error}
            >
              {error}
            </Alert>
          ))}
        </div>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={isOpenSuccess}
        onClose={handleCloseSuccess}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertComponent;
