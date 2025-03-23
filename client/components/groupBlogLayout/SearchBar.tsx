"use client";
import { lato } from "@/fonts";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";

const SearchBar = () => {
  const router = useRouter();

  const { searchText, setSearchText } = useBlogStore((state) => state);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="border border-[#000] relative">
      <div className="absolute w-full px-10 top-[-28px]">
        <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
          Tìm kiếm
        </h1>
      </div>
      <div className="p-10 pb-7">
        <Box component="form" noValidate autoComplete="off" className="mt-3">
          <TextField
            id="filled-basic"
            className={`${lato.variable} font-sans`}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const searchTextTrim = searchText.trim();
                router.push(
                  `/blog?search=${encodeURIComponent(searchTextTrim)}`
                );
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default SearchBar;
