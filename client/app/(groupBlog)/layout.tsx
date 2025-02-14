"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logoBlog from "@/assets/images/logoBlog.png";
import Image from "next/image";
import Footer from "../../components/Footer";
import AccordionMenu from "../../components/AccordionMenu";
import { useCategoryStore } from "@/zustand/stores/category-store";
import { useBlogStore } from "@/zustand/stores/blog-store";
import LinkItem from "@/components/LinkItem/LinkItem";
import { usePathname } from "next/navigation";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const { fetchCategories } = useCategoryStore((state) => state);
  const { fetchStatisticMonths } = useBlogStore((state) => state);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchCategories();
    fetchStatisticMonths();
  }, [fetchCategories, fetchStatisticMonths]);

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, [pathname]);

  return (
    <div className="bg-[#f4f4f4] h-full py-10 min-h-screen">
      <div className="container mx-auto bg-white shadow-[0_0_5px_#ddd] max-lg:mx-0 max-lg:!max-w-full">
        <div className="pt-16 px-16 pb-10 max-md:px-0">
          <header className="my-10 text-xs uppercase">
            <div className="border-t border-b border-[#000] relative max-md:border-white">
              <div className="flex justify-between max-md:hidden">
                <ul className="flex w-[40%] justify-start flex-wrap tracking-wide">
                  <LinkItem
                    href={"/blog"}
                    label="Blog"
                    className="hover:text-primaryColor"
                  />
                  <LinkItem
                    href={"/menu"}
                    label="Mục lục"
                    className="hover:text-primaryColor"
                  />
                  <LinkItem
                    href={"/gioi-thieu"}
                    label="Giới thiệu"
                    className="hover:text-primaryColor"
                  />
                </ul>
                <ul className="flex w-[40%] justify-end flex-wrap tracking-wide">
                  <LinkItem
                    href={"/sign-in"}
                    label="Đăng nhập"
                    className="hover:text-primaryColor"
                  />
                  <LinkItem
                    href={"/sign-up"}
                    label="Đăng ký"
                    className="hover:text-primaryColor"
                  />
                </ul>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Link href={"/"}>
                  <Image src={logoBlog} alt="logo-blog-center" width={150} />
                </Link>
              </div>
            </div>
          </header>
          <div className="pt-16 acordion md:hidden">
            <AccordionMenu isOpen={isOpen} handleToggle={handleToggle} />
          </div>
        </div>
        <div className="px-16 pb-10 max-md:px-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
