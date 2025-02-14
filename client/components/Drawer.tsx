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
import React, { memo, useEffect } from "react";
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
  }, [openDrawer, isUpSM, toggleDrawer]);

  const handleClose = (
    _: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      toggleDrawer(false)();
    }
  };

  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={(event, reason) => handleClose(event, reason)}
    >
      <Box
        sx={{
          p: 2,
          height: 1,
        }}
      >
        <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2, width: 366 }}>
          <ListItemButton>
            <Link href={"/blog"}>
              <ListItemText primary="Blog" />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <Link href={"#"}>
              <ListItemText primary="Youtube" />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <Link href={"/gioi-thieu"}>
              <ListItemText primary="Giới thiệu" />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <Link href={"/sign-in"}>
              <ListItemText primary="Đăng nhập" />
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Link href={"/sign-up"}>
              <ListItemText primary="Đăng ký" />
            </Link>
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default memo(DrawerMenu);
