"use client";
import { useAlertStore } from "@/zustand/stores/alert-store";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import React from "react";

const LoadingComponent = () => {
  const { loading } = useAlertStore((state) => state);

  if (loading)
    return (
      <Backdrop
        open={loading}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress className="text-primaryColorBold" color="primary" />
      </Backdrop>
    );
};

export default LoadingComponent;
