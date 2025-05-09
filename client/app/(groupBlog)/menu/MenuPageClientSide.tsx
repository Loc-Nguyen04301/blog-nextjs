"use client";
import React from "react";
import { lato } from "@/fonts";
import Link from "next/link";
import { Box, TextField } from "@mui/material";
import { useCategoryStore } from "@/zustand/stores/category-store";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { convertToMonthYear } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

const MenuPageClientSide = () => {
  const router = useRouter();

  const { listCategories } = useCategoryStore((state) => state);
  const { statisticMonths, searchText, setSearchText } = useBlogStore(
    (state) => state
  );

  return (
    <div>
      <h1 className={`font-sans ${lato.variable}`}>
        Bạn có thể tìm đọc tất cả các bài viết trên Loc Nguyen Writer blog theo{" "}
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
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const searchTextTrim = searchText.trim();
              router.push(`/blog?search=${encodeURIComponent(searchTextTrim)}`);
            }
          }}
        />
      </Box>
      <h1 className="uppercase pt-10 text-2xl tracking-wide">Theo Đề Tài</h1>
      <ul className={`${lato.variable} font-sans mt-5`}>
        {listCategories &&
          listCategories.map((c) => (
            <li className="mb-4" key={c.id}>
              <Link
                href={`/category/${c.id}`}
                className="text-primaryColorBold hover:text-black"
              >
                {c.name}
              </Link>{" "}
              ({c.numberBlogs})
            </li>
          ))}
      </ul>

      <h1 className="uppercase pt-10 text-2xl tracking-wide">Theo thời gian</h1>
      <ul className={`${lato.variable} font-sans mt-5`}>
        {statisticMonths &&
          statisticMonths.map((item) => {
            const { displayMonth, month, year } = convertToMonthYear(item.time);
            return (
              <li className="mb-4" key={item.time}>
                <Link
                  href={`${year}/${month}`}
                  className="text-primaryColorBold hover:text-black"
                >
                  {displayMonth}
                </Link>{" "}
                ({item.blogNumbers})
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MenuPageClientSide;
