import React from "react";
import { lato } from "@/app/fonts";
import Link from "next/link";
import { Box, TextField } from "@mui/material";

const MenuPage = () => {
  return (
    <div>
      <h1 className={`font-sans ${lato.variable}`}>
        Bạn có thể tìm đọc tất cả các bài viết trên The Present Writer blog theo{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#tu_khoa"}
        >
          từ khoá
        </Link>
        , theo{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#de_tai"}
        >
          đề tài
        </Link>{" "}
        , hoặc theo{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#thoi_gian"}
        >
          thời gian
        </Link>{" "}
        xuất bản.
      </h1>
      <h1 className="uppercase pt-16 text-2xl tracking-wide">Tìm Kiếm</h1>
      <Box component="form" noValidate autoComplete="off" className="mt-5">
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
        />
      </Box>
      <h1 className="uppercase pt-10 text-2xl tracking-wide">Theo Đề Tài</h1>
      <ul className={`${lato.variable} font-sans mt-5`}>
        {Array.from({ length: 10 }, (_, indx) => (
          <li className="mb-4" key={indx}>
            <Link
              href={"abc"}
              className="text-primaryColorBold hover:text-black"
            >
              Chủ nghĩa tối giản (Minimalism)
            </Link>{" "}
            (29)
          </li>
        ))}
      </ul>

      <h1 className="uppercase pt-10 text-2xl tracking-wide">Theo thời gian</h1>
      <ul className={`${lato.variable} font-sans mt-5`}>
        {Array.from({ length: 10 }, (_, indx) => (
          <li className="mb-4" key={indx}>
            <Link
              href={"abc"}
              className="text-primaryColorBold hover:text-black"
            >
              March 2024
            </Link>{" "}
            (29)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
