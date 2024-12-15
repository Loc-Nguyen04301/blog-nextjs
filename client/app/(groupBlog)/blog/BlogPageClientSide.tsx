"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { lato } from "@/app/fonts";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import BlogComponent from "@/app/components/BlogComponent";

interface SearchParams {
  page: string;
  keyword: string;
}

const BlogPageClientSide = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const keywordParam = searchParams.get("keyword");
  console.log({ keywordParam, pageParam });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // setCurrentPage(value);
    // router.push(`/blog?page=${value}`);
  };

  return (
    <>
      {Array.from({ length: 3 }, (_, idx) => (
        <div className="mb-16 border-b border-[#000]" key={idx}>
          <BlogComponent
            linkTo={"/blog/1"}
            title="Title of Blog"
            description="description"
          />
        </div>
      ))}
      <Box>
        <Pagination
          count={10}
          showFirstButton
          showLastButton
          page={Number(pageParam) || 1}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default BlogPageClientSide;
