import FacebookIcon from "@/assets/icons/FacebookIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import avatarImage from "@/assets/images/avatarMyself.jpg";
import bannerBlogImage from "@/assets/images/bannerBlog.jpg";

import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const MainPage = () => {
  return (
    <>
      <section>
        <Box
          className="p-6"
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          <Image alt="cover-image" src={bannerBlogImage} className="w-full" />
        </Box>
      </section>

      <section className="text-right p-3">
        <FacebookIcon />
        <YoutubeIcon />
      </section>

      <section>
        <div className="py-10 px-3 gap-8 container mx-auto flex max-md:flex-col">
          <div className="p-5 w-[30%] max-md:w-full">
            <Image
              src={avatarImage}
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-black w-[70%] max-md:w-full font-[Arial]">
            <h1 className="font-bold text-center mb-2 text-xl">Xin Chào!</h1>
            <div className="text-[15px] font-sans">
              <p className="my-4">
                Cảm ơn bạn đã ghé thăm website The Present Writer. Đây là một
                “khu vườn xanh yên tĩnh”—theo cách gọi của nhiều người yêu The
                Present Writer—là nơi để bạn nghỉ ngơi, suy ngẫm và lắng nghe
                tâm hồn mình sau những ồn ào, mệt mỏi của thế giới bên ngoài.
              </p>
              <p className="my-4">
                The Present Writer bắt đầu là một Blog cá nhân từ năm 2016 và
                dần được phát triển thêm thành kênh Youtube và Podcast về bài
                học cuộc sống, phát triển bản thân và Chủ nghĩa tối giản.
              </p>
              <p className="my-4">
                The Present Writer được sáng tạo bởi Chi Nguyễn—Tiến sĩ Giáo dục
                tại Mỹ, blogger, và tác giả “Một Cuốn Sách Về Chủ Nghĩa Tối
                Giản”. Đọc thêm về Chi và The Present Writer tại đây
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
