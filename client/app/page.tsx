'use client'
import { Box, Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen)
  }

  return (
    <>
      <section>
        <div className="container mx-auto flex justify-between items-center h-[100px] px-6" >
          <span className="uppercase text-[26px]">The Present Writer</span>
          <Box className="flex gap-3 justify-end max-sm:hidden">
            <div className="px-2 font-medium text-[15px] uppercase">blog</div>
            <div className="px-2 font-medium text-[15px] uppercase">blog</div>
            <div className="px-2 font-medium text-[15px] uppercase">blog</div>
            <div className="px-2 font-medium text-[15px] uppercase">blog</div>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
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

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              p: 2,
              height: 1,

            }}
          >
            <IconButton sx={{ mb: 2 }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <ListItemButton>
                <ListItemIcon>
                  <ImageIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Pictures" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Other" />
              </ListItemButton>
            </Box>
          </Box>
        </Drawer>
      </section>
      <section>
        <Box className="p-6"
          sx={{
            backgroundColor: 'primary.main'
          }}
          >
          <Image
            alt="cover-image"
            src={"https://i0.wp.com/thepresentwriter.com/wp-content/uploads/2024/05/2024-05-24-home-page-3.jpg?resize=1024%2C405&ssl=1"}
            width={1500}
            height={500}
          />
        </Box>
      </section>
    </>
  );
}
