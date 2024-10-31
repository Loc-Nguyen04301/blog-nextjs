'use client'
import Image from "next/image";
import { Box, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(true)
  }

  return (
    <section className="">
      <div className="container mx-auto flex justify-between items-center h-[100px] px-2" >
        <h1 className="uppercase text-[26px] w-1/2">The Present Writer</h1>
        <Box
          className="flex gap-3 w-1/2 justify-end"
          sx={{
            display: {
              xs: "block",
              sm: "none"
            }
          }}
        >
          <div className="px-2 font-medium text-[15px] uppercase ">blog</div>
          <div className="px-2 font-medium text-[15px] uppercase ">blog</div>
          <div className="px-2 font-medium text-[15px] uppercase ">blog</div>
          <div className="px-2 font-medium text-[15px] uppercase ">blog</div>
        </Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            mr: 2,
            display: {
              sm: "none"
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </section>
  );
}
