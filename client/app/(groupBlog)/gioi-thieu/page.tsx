import Link from "next/link";
import React from "react";
import Image from "next/image";
import avatarMySelf from "@/assets/images/avatarMyself.jpg";
import logoBlog from "@/assets/images/logoBlog.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu - Loc Nguyen Writer",
  description: "Giới thiệu - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

const AboutMePage = () => {
  return (
    <div className="font-['Arial']">
      <h1>
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#cam_on"}
        >
          Cám ơn
        </Link>{" "}
        bạn đã ghé thăm blog <strong>Loc Nguyen Writter! </strong>Hãy để tôi làm
        quen với bạn bằng câu chuyện của{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#toi"}
        >
          tôi
        </Link>{" "}
        và thông qua các bài{" "}
        <Link
          className="text-primaryColorBold hover:text-black duration-200"
          href={"#de_tai"}
        >
          blog
        </Link>{" "}
        bằng lời kể của mình.
      </h1>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold uppercase" id="toi">
          1. Về Lộc Nguyễn
        </h1>
        <div className="my-5">
          <Image
            src={avatarMySelf}
            alt="avatar-about-me"
            width={318}
            className="mx-auto"
          />
        </div>
        <p className="pt-5">
          Xin chào, tôi là{" "}
          <em className="font-semibold">Lộc Nguyễn (Nguyễn Gia Lộc) </em> – tác
          giả của blog <em>Loc Nguyen Writer.</em>
        </p>
        <p className="mt-8">
          Sinh ra và lớn lên ở Hà Nội, Việt Nam nhưng lập nghiệp và định cư tại
          Mỹ, tôi cảm giác mình vừa thuộc về nhiều nơi, và vừa không thuộc về
          một đâu cả. Tôi là Tiến sĩ Giáo dục, chuyên về chính sách, lãnh đạo,
          và giáo dục so sánh. Các nghiên cứu của tôi xoay quanh vấn đề bình
          đẳng xã hội và cơ hội học tập cho thanh thiếu niên có hoàn cảnh khó
          khăn. Hiện tôi giảng dạy và nghiên cứu tại University of Arizona với
          vị trí Assistant Professor (Phó giáo sư dự khuyết).{" "}
        </p>
        <p className="mt-8">
          Trong quá trình sống, học tập, và nghiên cứu, tôi thấy những điều mình
          học được từ cuộc sống có giá trị rất lớn, thậm chí lớn hơn những điều
          nhận được qua sách vở. Có những điều rất hay tôi được học trên giảng
          đường, nhưng phải qua trải nghiệm tôi mới thật sự thấm thía và hiểu
          được các ý nghĩa sâu sắc của nó. Tôi luôn muốn được sống, trải nghiệm,
          viết, và chia sẻ với mọi người.
        </p>
        <p className="mt-8">
          Bạn có thể liên hệ với tôi qua email: connect@thepresentwriter.com
          hoặc các mạng xã hội Instagram và Facebook.
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold uppercase" id="de_tai">
          2. Về Loc Nguyen Writer{" "}
        </h1>
        <div className="my-5">
          <Image
            src={logoBlog}
            alt="avatar-about-me"
            width={318}
            className="mx-auto"
          />
        </div>
        <p className="pt-5">
          Loc Nguyen Writer là blog về những trải nghiệm trong cuộc sống, nghiên
          cứu, và làm việc của tôi (Chi). Tôi viết những đề tài: học tiếng Anh,
          du học, giáo dục, kỹ năng mềm, du lịch, phong cách sống, quan hệ xã
          hội, chủ nghĩa tối giản … — tất cả những điều tôi cảm thấy có ích và
          có thể giúp tôi trưởng thành hơn. Đây là blog về cuộc sống của tôi.
          Tôi sống để viết, và viết để được sống “nhiều” hơn. Và hy vọng qua
          blog của tôi, bạn tìm thấy điều gì đó có ích cho cuộc sống của bạn.
        </p>
        <p className="mt-8">
          Một số bạn đọc từng gọi blog là “khu vườn xanh yên tĩnh” vì khi đọc
          blog, bạn cảm thấy như bước vào một thế giới trong trẻo, mát lành, yên
          ả khác với những ồn ào trên mạng Internet và cuộc sống bên ngoài. Tôi
          thích cách nhìn này và sẽ cố gắng để blog mãi xanh, trong và tĩnh như
          nó vốn có.
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold uppercase" id="cam_on">
          3. Lời cảm ơn{" "}
        </h1>
        <div className="my-5">
          <Image
            src={logoBlog}
            alt="avatar-about-me"
            width={318}
            className="mx-auto"
          />
        </div>
        <p className="pt-5">
          The Present Writer là blog về những trải nghiệm trong cuộc sống,
          nghiên cứu, và làm việc của tôi (Chi). Tôi viết những đề tài: học
          tiếng Anh, du học, giáo dục, kỹ năng mềm, du lịch, phong cách sống,
          quan hệ xã hội, chủ nghĩa tối giản … — tất cả những điều tôi cảm thấy
          có ích và có thể giúp tôi trưởng thành hơn. Đây là blog về cuộc sống
          của tôi. Tôi sống để viết, và viết để được sống “nhiều” hơn. Và hy
          vọng qua blog của tôi, bạn tìm thấy điều gì đó có ích cho cuộc sống
          của bạn.
        </p>
        <p className="mt-8">
          Một số bạn đọc từng gọi blog là “khu vườn xanh yên tĩnh” vì khi đọc
          blog, bạn cảm thấy như bước vào một thế giới trong trẻo, mát lành, yên
          ả khác với những ồn ào trên mạng Internet và cuộc sống bên ngoài. Tôi
          thích cách nhìn này và sẽ cố gắng để blog mãi xanh, trong và tĩnh như
          nó vốn có.
        </p>
        <p className="mt-8">Chúc bạn một ngày tốt lành!</p>
        <p className="mt-8 mb-20">Lộc Nguyễn</p>
      </div>
    </div>
  );
};

export default AboutMePage;
