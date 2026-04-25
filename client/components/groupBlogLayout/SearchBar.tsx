"use client";
import {
  clearRecentSearches,
  getRecentSearches,
  removeRecentSearch,
  saveRecentSearch,
} from "@/utils/recentSearches";
import { useBlogStore } from "@/zustand/stores/blog-store";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const { searchText, setSearchText } = useBlogStore((state) => state);

  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    getRecentSearches()
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    const history = getRecentSearches();
    setRecentSearches(history);
    if (history.length > 0) setDropdownOpen(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleSelectRecent = (keyword: string) => {
    setSearchText(keyword);
    setDropdownOpen(false);
    router.push(`/blog?search=${encodeURIComponent(keyword)}`);
  };

  const handleRemove = (e: React.MouseEvent, keyword: string) => {
    e.stopPropagation();
    removeRecentSearch(keyword);
    const updated = getRecentSearches();
    setRecentSearches(updated);
    if (updated.length === 0) setDropdownOpen(false);
  };

  const handleClearAll = () => {
    clearRecentSearches();
    setRecentSearches([]);
    setDropdownOpen(false);
  };

  return (
    <div className="border border-[#000] relative">
      <div className="absolute w-full px-10 top-[-28px]">
        <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
          Tìm kiếm
        </h1>
      </div>
      <div className="p-10 pb-7">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="mt-3"
          ref={anchorRef}
        >
          <TextField
            id="filled-basic"
            label="Search this website"
            variant="filled"
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            value={searchText}
            onChange={handleChangeSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const searchTextTrim = searchText.trim();
                saveRecentSearch(searchTextTrim);
                setRecentSearches(getRecentSearches());
                router.push(
                  `/blog?search=${encodeURIComponent(searchTextTrim)}`
                );
              }
            }}
          />
        </Box>
        <Popper
          open={dropdownOpen && recentSearches.length > 0}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ zIndex: 1300, width: anchorRef.current?.offsetWidth }}
        >
          <Paper elevation={3}>
            <Box
              sx={{
                px: 2,
                pt: 1.5,
                pb: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Tìm kiếm gần đây
              </Typography>
              <Button
                size="small"
                onClick={handleClearAll}
                sx={{ fontSize: "11px", py: 0, minWidth: "auto" }}
              >
                Xóa tất cả
              </Button>
            </Box>
            <List dense disablePadding>
              {recentSearches.map((keyword) => (
                <ListItem
                  key={keyword}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={(e) => handleRemove(e, keyword)}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    onClick={() => handleSelectRecent(keyword)}
                    sx={{ py: 0.5, pr: 6 }}
                  >
                    <ListItemText
                      primary={keyword}
                      primaryTypographyProps={{ fontSize: "13px" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </div>
    </div>
  );
};

export default SearchBar;
