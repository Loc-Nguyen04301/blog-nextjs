"use client";
import { useCallback, useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import avatarImage from "@/assets/images/avatarMyself.jpg";
import bannerBlogImage from "@/assets/images/bannerBlog.jpg";

import Link from "next/link";
import DrawerMenu from "./components/Drawer";

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center h-[100px] px-6">
          <Link
            className="uppercase text-[26px] hover:scale-110 duration-300 max-[400px]:text-[22px]"
            href="/#"
          >
            Loc Nguyen Writer
          </Link>
          <Box className="flex gap-3 justify-end max-sm:hidden">
            <Link
              className="px-2 font-medium text-[15px] uppercase hover:text-primaryColor cursor-pointer"
              href="/blog"
            >
              blog
            </Link>
            <div className="px-2 font-medium text-[15px] uppercase hover:text-primaryColor cursor-pointer">
              youtube
            </div>
            <Link
              className="px-2 font-medium text-[15px] uppercase hover:text-primaryColor cursor-pointer"
              href="/gioi-thieu"
            >
              giới thiệu
            </Link>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="drawer"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <DrawerMenu openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      </section>

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
      <section>
        <Box
          className="p-6"
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          <div className="text-center text-sm">
            © All rights reserved by Loc Nguyen
          </div>
        </Box>
      </section>
    </>
  );
}
