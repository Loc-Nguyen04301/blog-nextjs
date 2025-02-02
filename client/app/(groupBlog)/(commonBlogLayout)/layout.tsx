"use client";
import Image from "next/image";
import avatarMySelf from "@/assets/images/avatarMyself.jpg";
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
import { useEffect } from "react";
import { useCategoryStore } from "@/zustand/stores/category-store";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/zustand/stores/blog-store";
import ContactSocialMedia from "@/components/ContactSocialMedia";

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
  const router = useRouter();

  const { listCategories, selectedCategory, setSelectedCategory } =
    useCategoryStore((state) => state);
  const { searchText, setSearchText } = useBlogStore((state) => state);

  const handleChangeSelect = (
    event: SelectChangeEvent<typeof selectedCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (selectedCategory) router.push(`/category/${selectedCategory}`);
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-11">
      <div className="col-span-7 max-md:col-span-12">{children}</div>
      <div className="col-span-4 max-md:col-span-12 ml-16 max-md:ml-0 max-md:mt-20">
        <div className="flex flex-col gap-16">
          <div className="border border-[#000] p-8 pb-7">
            <Image src={avatarMySelf} alt="avatarMySelf" />
            <div className={`mt-5 ${lato.variable} font-sans text-[15px]`}>
              <span>
                Loc Nguyen Writer là “khu vườn xanh yên tĩnh” - nơi chia sẻ
                khoảnh khắc, cảm xúc của bản thân. Giới thiệu về
              </span>
              <Link
                className="font-semibold border-b border-b-primaryColorBold ml-1"
                href={"/gioi-thieu"}
              >
                tôi
              </Link>
            </div>
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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setSelectedCategory("");
                      const searchTextTrim = searchText.trim();
                      router.push(
                        `/blog?search=${encodeURIComponent(searchTextTrim)}`
                      );
                    }
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
                  value={selectedCategory}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className={`${lato.variable} font-sans`} value={""}>
                    Select Category
                  </MenuItem>
                  {listCategories &&
                    listCategories.map((c) => (
                      <MenuItem
                        key={c.id}
                        value={c.id}
                        className={`${lato.variable} font-sans`}
                      >
                        {c.name}
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
              <ContactSocialMedia />
            </div>
          </div>

          {/* Ủng hộ */}
          {/* <div className="border border-[#000] relative">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
