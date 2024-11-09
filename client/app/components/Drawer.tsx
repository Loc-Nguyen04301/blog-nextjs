"use client";
import {
  Box,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

interface DrawerMenu {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

const DrawerMenu = ({ openDrawer, toggleDrawer }: DrawerMenu) => {
  const theme = useTheme();
  const isUpSM = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

  useEffect(() => {
    if (openDrawer && isUpSM) {
      toggleDrawer(false)();
    }
  }, [openDrawer, isUpSM]);

  return (
    <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
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

        <Box sx={{ mb: 2, width: 366 }}>
          <ListItemButton>
            <Link href={"/blog"}>
              <ListItemText primary="Blog" />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <Link href={"/gioi-thieu"}>
              <ListItemText primary="Giới thiệu" />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <ListItemText primary="Other" />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
