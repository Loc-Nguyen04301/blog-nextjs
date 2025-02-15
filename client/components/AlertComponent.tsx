"use client";
import { useAlertStore } from "@/zustand/stores/alert-store";
import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const MAX_ERROR_SHOW = 3;

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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenErrors(false);
    clearErrors();
    setOpenSuccess(false);
    clearSuccess();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={4000}
      open={isOpenErrors || isOpenSuccess}
      onClose={handleClose}
    >
      <div>
        {errors.length > 0 &&
          errors.slice(0, MAX_ERROR_SHOW).map((error, index) => (
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%", mb: 1 }}
              key={`${error}${index}`}
            >
              {error}
            </Alert>
          ))}
        {success && (
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
            key={success}
          >
            {success}
          </Alert>
        )}
      </div>
    </Snackbar>
  );
};

export default AlertComponent;
