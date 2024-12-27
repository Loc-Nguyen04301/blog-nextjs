import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const AccordionMenu = () => {
  return (
    <Accordion
      sx={{
        background: "#f5f5f5",
        "& .MuiAccordionDetails-root": {
          paddingLeft: 6,
          paddingTop: 2,
          paddingBottom: 2,
          fontSize: 12,
          textTransform: "uppercase",
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
        <Link href={"#"}>Home</Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link href={"/blog"}>Blog</Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link href={"/menu"}>Mục lục</Link>
      </AccordionDetails>
      <AccordionDetails>
        <Link href={"/gioi-thieu"}>Giới thiệu</Link>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionMenu;
