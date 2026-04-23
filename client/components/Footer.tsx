import { lato } from "@/fonts";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={`text-center ${lato.variable} font-sans text-xs font-bold mt-10`}
    >
      <p>© Copyright All Rights Reserved By Loc Nguyen</p>
    </footer>
  );
};

export default Footer;
