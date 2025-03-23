import { lato } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import avatarMySelf from "@/assets/images/avatarMyself.jpg";

const AboutMe = () => {
  return (
    <div className="border border-[#000] p-8 pb-7">
      <Image src={avatarMySelf} alt="avatarMySelf" />
      <div className={`mt-5 ${lato.variable} font-sans text-[15px]`}>
        <span>
          Loc Nguyen Writer là “khu vườn xanh yên tĩnh” - nơi chia sẻ khoảnh
          khắc, cảm xúc của bản thân. Giới thiệu về
        </span>
        <Link
          className="font-semibold border-b border-b-primaryColorBold ml-1"
          href={"/gioi-thieu"}
        >
          tôi
        </Link>
      </div>
    </div>
  );
};

export default AboutMe;
