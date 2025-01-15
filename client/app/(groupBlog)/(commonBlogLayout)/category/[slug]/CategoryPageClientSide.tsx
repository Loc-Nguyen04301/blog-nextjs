"use client";
import BlogComponent from "@/components/BlogComponent";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { useCategoryStore } from "@/zustand/stores/category-store";
import { Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface CategoryPageClientSide {
  slug: string;
}

const CategoryPageClientSide = ({
  slug: categoryId,
}: CategoryPageClientSide) => {
  const {
    setSelectedCategory,
    fetchBlogsByCategory,
    listBlogsByCategory,
    pageNumbers,
  } = useCategoryStore((state) => state);
  const { setSearchText } = useBlogStore((state) => state);

  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = Number(searchParams.get("page") || "1");

  useEffect(() => {
    setSelectedCategory(categoryId);
    setSearchText("");
  }, [categoryId]);

  useEffect(() => {
    fetchBlogsByCategory(Number(categoryId), pageParam);
  }, [categoryId, pageParam]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/category/${categoryId}?&page=${value}`);
  };

  return (
    <>
      {listBlogsByCategory &&
        listBlogsByCategory.map((blog) => (
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

export default CategoryPageClientSide;
