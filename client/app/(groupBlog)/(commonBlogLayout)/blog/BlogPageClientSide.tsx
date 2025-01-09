"use client";
import React, { useEffect } from "react";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import BlogComponent from "@/components/BlogComponent";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/zustand/stores/blog-store";

const BlogPageClientSide = () => {
  const { fetchBlog, listBlogs, pageNumbers } = useBlogStore((state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = Number(searchParams.get("page") || "1");
  const keywordParam = searchParams.get("keyword") || "";

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/blog?page=${value}`);
  };

  useEffect(() => {
    fetchBlog(pageParam, keywordParam);
  }, [pageParam, keywordParam]);

  return (
    <>
      {listBlogs?.map((blog) => (
        <div className="mb-16 border-b border-[#000]" key={blog.id}>
          <BlogComponent
            linkTo={`/blog/${blog.id}`}
            title={blog.title}
            thumbnail={String(blog.thumbnail)}
            description={blog.description}
            categories={blog.categories}
          />
        </div>
      ))}
      <Box>
        <Pagination
          count={pageNumbers}
          showFirstButton
          showLastButton
          page={Number(pageParam)}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default BlogPageClientSide;