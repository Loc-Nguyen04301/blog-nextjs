"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language?.startsWith("en") ? "en" : "vi"}
      onChange={handleChange}
      size="small"
      variant="standard"
      disableUnderline
      sx={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "inherit",
        "& .MuiSelect-icon": { color: "inherit" },
      }}
    >
      <MenuItem value="vi" sx={{ fontSize: "12px" }}>VI</MenuItem>
      <MenuItem value="en" sx={{ fontSize: "12px" }}>EN</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
