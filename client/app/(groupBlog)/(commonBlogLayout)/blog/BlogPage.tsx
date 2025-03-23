"use client";
import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import BlogComponent from "@/components/BlogComponent";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { lato } from "@/fonts";
import { useCategoryStore } from "@/zustand/stores/category-store";

const BlogPageClientSide = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setSelectedCategory } = useCategoryStore((state) => state);
  const { fetchBlogs, listBlogs, pageNumbers } = useBlogStore((state) => state);

  const pageParam = Number(searchParams.get("page") || "1");
  const keywordParam = searchParams.get("search") || undefined;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (keywordParam) router.push(`/blog?search=${keywordParam}&page=${value}`);
    else router.push(`/blog?page=${value}`);
  };

  useEffect(() => {
    fetchBlogs({ page: pageParam, keyword: keywordParam });
  }, [pageParam, keywordParam, fetchBlogs]);

  useEffect(() => {
    if (keywordParam) setSelectedCategory("");
  }, [keywordParam, setSelectedCategory]);

  return (
    <>
      {listBlogs?.map((blog) => (
        <BlogComponent
          key={blog.id}
          linkTo={`/blog/${blog.id}`}
          title={blog.title}
          thumbnail={String(blog.thumbnail)}
          description={blog.description}
          categories={blog.categories}
        />
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
      {pageNumbers > 1 && (
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
