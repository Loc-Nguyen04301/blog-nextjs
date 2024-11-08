import { lato } from "@/app/fonts";
import Link from "next/link";
import React from "react";

const AboutMePage = () => {
  return (
    <div className="pt-16">
      <h1 className={`font-sans ${lato.variable}`}>
        Cám ơn bạn đã ghé thăm blog Loc Nguyen Writter! Hãy để tôi làm quen với
        bạn bằng câu chuyện của{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#toi"}
        >
          tôi
        </Link>{" "}
        và của{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#de_tai"}
        >
          blog
        </Link>{" "}
        bằng lời kể của mình và{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#thoi_gian"}
        >
          truyền thông
        </Link>
        .
      </h1>
    </div>
  );
};

export default AboutMePage;
