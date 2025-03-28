"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useFetchDataBlogLayout from "@/hooks/useFetchDataBlogLayout";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const AccordionMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
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
        <Link className="hover:text-primaryColor" href={"/blog"}>
          Blog
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={"/video"}>
          Video
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={"/menu"}>
          Mục lục
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={"/gioi-thieu"}>
          Giới thiệu
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={"/sign-in"}>
          Đăng nhập
        </Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link className="hover:text-primaryColor" href={"/sign-up"}>
          Đăng ký
        </Link>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionMenu;
