"use client";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DrawerMenu from "../../components/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useCategoryStore } from "@/zustand/stores/category-store";

const MainAndAuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { fetchCategories } = useCategoryStore((state) => state);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="flex justify-between items-center h-[100px] px-6 border-b">
          <Link
            className="uppercase text-[26px] hover:scale-110 duration-300 max-[400px]:text-[22px]"
            href="/"
          >
            Loc Nguyen Writer
          </Link>
          <ul className="flex gap-3 justify-end max-sm:hidden">
            <Link
              className="px-2 font-medium text-[14px] uppercase hover:text-primaryColor cursor-pointer"
              href="/blog"
            >
              blog
            </Link>
            <Link
              className="px-2 font-medium text-[14px] uppercase hover:text-primaryColor cursor-pointer"
              href="/video"
            >
              video
            </Link>
            <Link
              className="px-2 font-medium text-[14px] uppercase hover:text-primaryColor cursor-pointer"
              href="/gioi-thieu"
            >
              giới thiệu
            </Link>
            <Link
              className="px-2 font-medium text-[14px] uppercase hover:text-primaryColor cursor-pointer"
              href="/sign-in"
            >
              đăng nhập
            </Link>
            <Link
              className="px-2 font-medium text-[14px] uppercase hover:text-primaryColor cursor-pointer"
              href="/sign-up"
            >
              đăng ký
            </Link>
          </ul>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="drawer"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <DrawerMenu openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      </header>
      {children}
      <footer>
        <Box
          className="p-6"
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          <div className="text-center text-sm">
            © Copyright All Rights Reserved By Loc Nguyen
          </div>
        </Box>
      </footer>
    </div>
  );
};

export default MainAndAuthLayout;
