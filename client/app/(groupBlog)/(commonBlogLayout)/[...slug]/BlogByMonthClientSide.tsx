"use client";
import { useBlogStore } from "@/zustand/stores/blog-store";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material";
import { lato } from "@/fonts";
import BlogComponent from "@/components/BlogComponent";

interface BlogByMonthClientSideProps {
  slug: string;
}

const BlogByMonthClientSide = ({ slug }: BlogByMonthClientSideProps) => {
  const { fetchBlogsByMonth, listBlogs, pageNumbers } = useBlogStore(
    (state) => state
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = Number(searchParams.get("page") || "1");

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/${slug[0]}/${slug[1]}?page=${value}`);
  };

  useEffect(() => {
    fetchBlogsByMonth(slug[0], slug[1], { page: pageParam });
  }, [pageParam, slug, pageParam]);

  return (
    <>
      {listBlogs?.map((blog) => (
        <BlogComponent
          linkTo={`/blog/${blog.id}`}
          title={blog.title}
          thumbnail={String(blog.thumbnail)}
          description={blog.description}
          categories={blog.categories}
          key={blog.id}
        />
      ))}
      {pageNumbers === 0 && (
        <>
          <div className="uppercase text-lg tracking-wide">
            Search Results for: {"abc"}
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

export default BlogByMonthClientSide;
