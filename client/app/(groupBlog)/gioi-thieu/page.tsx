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
      <div className="mt-10">
        <h1 className="text-3xl font-semibold uppercase">ABOUT ME</h1>
        <div className="my-5">
          <Image
            src={avatarMySelf}
            alt="avatar-about-me"
            width={318}
            className="mx-auto"
          />
        </div>
        <p className="pt-5">
          Xin chào, tôi là <em className="font-semibold">Lộc</em> – tác giả của
          blog <em>Loc Nguyen Writer.</em>
        </p>
        <p className="mt-8"></p>
        <p className="mt-8">
          Trong quá trình học tập và làm việc, tôi nhận thấy những điều mình học
          được từ cuộc sống có giá trị rất lớn. Có những điều rất hay tôi được
          học trên giảng đường, nhưng phải qua trải nghiệm tôi mới thật hiểu
          được các ý nghĩa sâu sắc của nó. Tôi muốn được trải nghiệm và ghi lại
          những điều đó và mong muốn chia sẻ với mọi người.
        </p>
        <p className="mt-8">
          Bạn có thể liên hệ với tôi qua email (nguyengialoc7@gmail.com) hay các
          nền tảng mạng xã hội Instagram và Facebook.
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-semibold uppercase" id="de_tai">
          Về Loc Nguyen Writer{" "}
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
    </div>
  );
};

export default AboutMePage;
