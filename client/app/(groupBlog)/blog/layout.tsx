"use client";
import Image from "next/image";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { lato } from "@/fonts";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Link from "next/link";
import fbIcon from "@/assets/images/fbIcon.png";
import instagramIcon from "@/assets/images/instagramIcon.png";
import wifiIcon from "@/assets/images/wifiIcon.png";
import emailIcon from "@/assets/images/emailIcon.png";
import { useState } from "react";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Chủ nghĩa tối giản (Minimalism)",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [personName, setPersonName] = useState<string>("");
  const handleChangeSelect = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    setPersonName(value);
  };

  return (
    <div className="grid grid-cols-11">
      <div className="col-span-7 max-md:col-span-12">{children}</div>
      <div className="col-span-4 max-md:col-span-12 ml-16 max-md:ml-0">
        <div className="flex flex-col gap-16">
          <div className="border border-[#000] p-8 pb-7">
            <Image src={thumnailBlog} alt="thumnaiblog" />
            <p className={`mt-5 ${lato.variable} font-sans text-[15px]`}>
              The Present Writer là “khu vườn xanh yên tĩnh” của Chi Nguyễn—Tiến
              sĩ Giáo dục tại Mỹ. Đọc thêm về Chi & Blog
            </p>
          </div>
          {/* Tìm kiếm */}
          <div className="border border-[#000] relative">
            <div className="absolute w-full px-10 top-[-28px]">
              <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
                Tìm kiếm
              </h1>
            </div>
            <div className="p-10 pb-7">
              <Box
                component="form"
                noValidate
                autoComplete="off"
                className="mt-3"
              >
                <TextField
                  id="filled-basic"
                  className={`${lato.variable} font-sans`}
                  label="Search this website"
                  variant="filled"
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                    },
                  }}
                />
              </Box>
            </div>
          </div>
          {/* Đề tài */}
          <div className="border border-[#000] relative">
            <div className="absolute w-full px-10 top-[-28px]">
              <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
                Đề tài
              </h1>
            </div>
            <div className="p-10 pb-7">
              <FormControl fullWidth className="mt-3" variant="filled">
                <Select
                  displayEmpty
                  value={personName}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className={`${lato.variable} font-sans`} value={""}>
                    Select Category
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      className={`${lato.variable} font-sans`}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {/* Bài Viết Mới Nhất */}
          <div className="border border-[#000] relative">
            <div className="absolute w-full px-10 top-[-28px]">
              <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
                Bài Viết Mới Nhất
              </h1>
            </div>
            <div className="p-10 pb-7 mt-3">
              <ul>
                {Array.from({ length: 5 }, (_, idx) => (
                  <li
                    className={`mt-4 ${lato.variable} font-sans text-[15px] hover:text-primaryColor font-semibold`}
                    key={idx}
                  >
                    <Link href={"#"} className="border-b border-primaryColor">
                      Tại sao tôi ngừng viết & Tương lai The Present Writer
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Kết nối */}
          <div className="border border-[#000] relative">
            <div className="absolute w-full px-10 top-[-28px]">
              <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
                Kết nối
              </h1>
            </div>
            <div className="p-10 pb-7 mt-3 mb-4">
              <div className="flex gap-2">
                <Link target="_blank" href="/">
                  <Image src={wifiIcon} alt="fb-icon" width={40} />
                </Link>
                <Link target="_blank" href="mailto:nguyengialoc7@gmail.com">
                  <Image src={emailIcon} alt="fb-icon" width={40} />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=100009072109785"
                >
                  <Image src={fbIcon} alt="fb-icon" width={40} />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/loc_nguyen_43/"
                >
                  <Image src={instagramIcon} alt="fb-icon" width={40} />
                </Link>
              </div>
            </div>
          </div>

          {/* Ủng hộ */}
          <div className="border border-[#000] relative">
            <div className="absolute w-full px-10 top-[-28px]">
              <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
                Ủng hộ
              </h1>
            </div>
            <div className="p-10 pb-7 mt-3">
              <p
                className={`${lato.variable} font-sans text-[15px] text-center`}
              >
                Ủng hộ để blog tiếp tục hoạt động bền vững, miễn phí và không
                banner quảng cáo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
