import Link from "next/link";
import React from "react";
import logoBlogCenter from "@/assets/images/logoBlogCenter.jpg";
import Image from "next/image";
import Footer from "../components/Footer";
import AccordionMenu from "../components/AccordionMenu";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#f4f4f4] h-full py-10 min-h-screen">
      <div className="container mx-auto bg-white shadow-[0_0_5px_#ddd] max-lg:mx-0 max-lg:!max-w-full">
        <div className="pt-16 px-16 pb-10 max-md:px-0">
          <header className="my-10 text-xs uppercase">
            <div className="border-t border-b border-[#000] relative max-md:border-white">
              <div className="flex justify-between max-md:hidden">
                <ul className="flex w-[40%] justify-start flex-wrap tracking-wide">
                  {/* <li className="p-4 py-7">
                    <Link href={"/"} className="hover:text-primaryColor">
                      Home
                    </Link>
                  </li> */}
                  <li className="p-4 py-7">
                    <Link href={"/blog"} className="hover:text-primaryColor">
                      Blog
                    </Link>
                  </li>
                  <li className="p-4 py-7">
                    <Link href={"/menu"} className="hover:text-primaryColor">
                      Mục lục
                    </Link>
                  </li>
                  <li className="p-4 py-7">
                    <Link
                      href={"/gioi-thieu"}
                      className="hover:text-primaryColor"
                    >
                      Giới thiệu
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-[40%] justify-end flex-wrap">
                  <li className="p-4 py-7">
                    <Link href={"/sign-in"} className="hover:text-primaryColor">
                      Đăng nhập
                    </Link>
                  </li>
                  <li className="p-4 py-7">
                    <Link href={"/sign-up"} className="hover:text-primaryColor">
                      Đăng ký
                    </Link>
                  </li>
                  <li className="p-4 py-7">
                    <Link href={"/blog"} className="hover:text-primaryColor">
                      Youtube
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Link href={"/"}>
                  <Image
                    src={logoBlogCenter}
                    alt="logo-blog center"
                    width={150}
                  />
                </Link>
              </div>
            </div>
          </header>
          <div className="pt-10 acordion md:hidden">
            <AccordionMenu />
          </div>
        </div>
        <div className="px-16 pb-10">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogLayout;
