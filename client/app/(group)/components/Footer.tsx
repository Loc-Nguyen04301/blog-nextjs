import { lato } from "@/app/fonts";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={`text-center ${lato.variable} font-sans text-xs font-bold mt-10`}
    >
      <p>
        Copyright © 2024 The Present Writer ·
        <Link
          className="ml-1 hover:text-primaryColor border-b border-primaryColor"
          href={"#"}
        >
          Log in
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
