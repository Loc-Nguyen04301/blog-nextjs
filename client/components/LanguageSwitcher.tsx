"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, SelectChangeEvent, Box } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

const LANGUAGES = [
  { code: "vi", label: "VI", countryCode: "VN" },
  { code: "en", label: "EN", countryCode: "US" },
];

const FlagLabel = ({ countryCode, label }: { countryCode: string; label: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{ width: "20px", height: "14px", objectFit: "cover", borderRadius: "2px" }}
    />
    <span>{label}</span>
  </Box>
);

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "vi";

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const currentLang = LANGUAGES.find((l) => l.code === current)!;

  return (
    <Select
      value={current}
      onChange={handleChange}
      size="small"
      variant="standard"
      disableUnderline
      renderValue={() => (
        <FlagLabel countryCode={currentLang.countryCode} label={currentLang.label} />
      )}
      sx={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "inherit",
        px: 1,
        "& .MuiSelect-select": { paddingRight: "24px !important" },
        "& .MuiSelect-icon": { color: "inherit" },
      }}
    >
      {LANGUAGES.map(({ code, label, countryCode }) => (
        <MenuItem
          key={code}
          value={code}
          sx={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", gap: "8px" }}
        >
          <FlagLabel countryCode={countryCode} label={label} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
