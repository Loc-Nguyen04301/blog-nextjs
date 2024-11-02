"use client";
import {
  Box,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";

import { useState } from "react";
import Image from "next/image";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import avatarImage from "@/assets/images/avatarMyself.jpg";
import bannerBlogImage from "@/assets/images/bannerBlog.jpg";

import Link from "next/link";

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <section>
        <div className="container mx-auto flex justify-between items-center h-[100px] px-6">
          <Link className="uppercase text-[26px] hover:scale-110 duration-300" href="/#">
            The Present Writer
          </Link>
          <Box className="flex gap-3 justify-end max-sm:hidden">
            <div className="px-2 font-medium text-[15px] uppercase">blog</div>
            <div className="px-2 font-medium text-[15px] uppercase">
              youtube
            </div>
            <div className="px-2 font-medium text-[15px] uppercase">
              podcase
            </div>
            <div className="px-2 font-medium text-[15px] uppercase">blog</div>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
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
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              p: 2,
              height: 1,
            }}
          >
            <IconButton sx={{ mb: 2 }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <ListItemButton>
                <ListItemIcon>
                  <ImageIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Pictures" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Other" />
              </ListItemButton>
            </Box>
          </Box>
        </Drawer>
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
        <div className="p-10 gap-8 container mx-auto flex max-md:flex-col">
          <div className="p-5 w-[30%] max-md:w-full">
            <Image
              src={avatarImage}
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-black w-[70%] max-md:w-full">
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
