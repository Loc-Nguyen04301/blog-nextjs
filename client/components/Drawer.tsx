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
import { getAccessToken } from "@/utils/authTokens";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface DrawerMenu {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

const DrawerMenu = ({ openDrawer, toggleDrawer }: DrawerMenu) => {
  const theme = useTheme();
  const isUpSM = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const isLoggedIn = !!getAccessToken();
  const { t } = useTranslation();

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
              <ListItemText primary={t("nav.blog", "Blog")} />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <Link href={"/video"}>
              <ListItemText primary={t("nav.video", "Video")} />
            </Link>
          </ListItemButton>

          <ListItemButton>
            <Link href={"/gioi-thieu"}>
              <ListItemText primary={t("nav.about", "Giới thiệu")} />
            </Link>
          </ListItemButton>

          {!isLoggedIn && (
            <>
              <ListItemButton>
                <Link href={"/sign-in"}>
                  <ListItemText primary={t("nav.signIn", "Đăng nhập")} />
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link href={"/sign-up"}>
                  <ListItemText primary={t("nav.signUp", "Đăng ký")} />
                </Link>
              </ListItemButton>
            </>
          )}

          <ListItemButton disableRipple sx={{ pl: 2, pt: 1 }}>
            <LanguageSwitcher />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default memo(DrawerMenu);
