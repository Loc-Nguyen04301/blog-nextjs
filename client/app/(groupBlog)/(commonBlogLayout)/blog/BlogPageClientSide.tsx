"use client";
import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import BlogComponent from "@/components/BlogComponent";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { lato } from "@/fonts";
import { useAlertStore } from "@/zustand/stores/alert-store";

const BlogPageClientSide = () => {
  const { fetchBlogs, listBlogs, pageNumbers } = useBlogStore((state) => state);
  const { loading } = useAlertStore((state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = Number(searchParams.get("page") || "1");
  const keywordParam = searchParams.get("search") || undefined;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (keywordParam) router.push(`/blog?search=${keywordParam}&page=${value}`);
    else router.push(`/blog?page=${value}`);
  };

  useEffect(() => {
    fetchBlogs(pageParam, keywordParam);
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
      {pageNumbers === 0 && (
        <>
          <div className="uppercase text-lg tracking-wide">
            Search Results for: {keywordParam}
          </div>
          <h1 className={`${lato.variable} font-sans mt-20 text-center`}>
            Sorry, no content matched your criteria.
          </h1>
        </>
      )}
      {pageNumbers > 0 && (
        <Pagination
          count={pageNumbers}
          showFirstButton
          showLastButton
          page={Number(pageParam)}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default BlogPageClientSide;
