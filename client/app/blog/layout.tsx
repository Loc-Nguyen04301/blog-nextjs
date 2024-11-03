import Link from "next/link";
import React from "react";
import logoBlogCenter from "@/assets/images/logoBlogCenter.jpg";
import Image from "next/image";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#f4f4f4] h-screen pt-10">
      <div className="container mx-auto bg-white shadow-[0_0_5px_#ddd]">
        <div className="pt-5 px-24">
          <header className="my-10">
            <div className="border-t border-[#000] border-b relative">
              <div className="flex justify-between px-4">
                <ul className="flex gap-12 w-[40%] justify-start">
                  <li className="py-5">
                    <Link href={"/blog"}>Blog</Link>
                  </li>
                  <li className="py-5">
                    <Link href={"/blog"}>Youtube</Link>
                  </li>
                  <li className="py-5">
                    <Link href={"/blog"}>Podcast</Link>
                  </li>
                  <li className="py-5">
                    <Link href={"/blog"}>Podcast</Link>
                  </li>
                </ul>
                <ul className="flex gap-12 w-[40%] justify-end">
                  <li className="py-5">
                    <Link href={"/blog"}>Bản tin</Link>
                  </li>
                  <li className="py-5">
                    <Link href={"/blog"}>Mục lục</Link>
                  </li>
                  <li className="py-5">
                    <Link href={"/blog"}>Giới thiệu</Link>
                  </li>
                </ul>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image src={logoBlogCenter} alt="logo-blog center" width={150}/>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
