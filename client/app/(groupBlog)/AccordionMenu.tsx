"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useFetchDataBlogLayout from "@/hooks/useFetchDataBlogLayout";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useAuthStore } from "@/zustand/stores/auth-store";
import { Routes } from "@/types/routes";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const AccordionMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    router.push(Routes.SIGN_IN);
  };

  useEffect(() => {
    return () => setIsOpen(false);
  }, [pathname]);

  useFetchDataBlogLayout();

  return (
    <Accordion
      expanded={isOpen}
      onChange={handleToggle}
      sx={{
        background: "#f5f5f5",
        "& .MuiAccordionDetails-root": {
          paddingLeft: 6,
          paddingTop: 2,
          paddingBottom: 2,
          fontSize: 12,
          textTransform: "uppercase",
        },
        "& .MuiButtonBase-root": {
          minHeight: "48px  !important",
          height: "48px !important",
        },
        "& .Mui-expanded": {
          margin: 0,
        },
      }}
      className="!rounded-none !shadow-none"
      slotProps={{ transition: { timeout: 400 } }}
    >
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            justifyContent: "center",
          },
        }}
      >
        <MenuIcon />
      </AccordionSummary>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={Routes.BLOG}>
          {t("nav.blog", "Blog")}
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={Routes.VIDEO}>
          {t("nav.video", "Video")}
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={Routes.MENU}>
          {t("nav.menu", "Mục lục")}
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={Routes.GIOI_THIEU}>
          {t("nav.about", "Giới thiệu")}
        </Link>
      </AccordionDetails>
      {isLoggedIn ? (
        <AccordionDetails>
          <button
            className="hover:text-primaryColor uppercase"
            onClick={handleLogout}
          >
            {t("nav.signOut", "Đăng xuất")}
          </button>
        </AccordionDetails>
      ) : (
        <>
          <AccordionDetails>
            <Link className="hover:text-primaryColor" href={Routes.SIGN_IN}>
              {t("nav.signIn", "Đăng nhập")}
            </Link>
          </AccordionDetails>
          <AccordionDetails>
            <Link className="hover:text-primaryColor" href={Routes.SIGN_UP}>
              {t("nav.signUp", "Đăng ký")}
            </Link>
          </AccordionDetails>
        </>
      )}
      <AccordionDetails>
        <LanguageSwitcher />
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionMenu;
