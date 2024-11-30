import { lato } from "@/app/fonts";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={`text-center ${lato.variable} font-sans text-xs font-bold mt-10`}
    >
      <p>
        © Copyright All Rights Reserved By Loc Nguyen
        <Link
          className="ml-1 hover:text-primaryColor border-b border-primaryColor"
          href={"/sign-in"}
        >
          Sign in
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
