import { unstable_cache } from "next/cache";
import { lato } from "@/fonts";
import BlogService from "@/services/BlogService";
import { IBlogDetail } from "@/types/blog";
import Link from "next/link";
import React from "react";

// Mark the component for static generation
export const dynamic = "force-static";

// Cached API call with 24-hour revalidation
const getCachedBlogs = unstable_cache(
  async () => {
    const response = await BlogService.getAllBlogs({
      page: 1,
      itemsPerPage: 5,
    });
    return response.data.data.listBlogs;
  },
  ["latest-blogs"],
  { revalidate: 86400 } // Revalidate every 24 hours (in seconds)
);

const LastestBlogList = async () => {
  const listBlogs: IBlogDetail[] = await getCachedBlogs();

  return (
    <div className="border border-[#000] relative">
      <div className="absolute w-full px-10 top-[-28px]">
        <h1 className="p-5 bg-black text-[#fff] text-center text-xs uppercase tracking-wide top-[">
          Bài Viết Mới Nhất
        </h1>
      </div>
      <div className="p-10 pb-7 mt-3">
        <ul>
          {listBlogs.map((blog) => (
            <li
              className={`mt-4 ${lato.variable} font-sans text-[15px] hover:text-primaryColor font-semibold`}
              key={blog.id}
            >
              <Link
                href={"#"}
                className="border-b border-primaryColor line-clamp-2"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LastestBlogList;
