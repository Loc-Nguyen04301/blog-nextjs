"use client";
import BlogComponent from "@/components/BlogComponent";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { useCategoryStore } from "@/zustand/stores/category-store";
import { Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { lato } from "@/fonts";

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
    listCategories,
  } = useCategoryStore((state) => state);
  const { setSearchText } = useBlogStore((state) => state);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = listCategories?.find(
    (c) => c.id === Number(categoryId)
  );

  const pageParam = Number(searchParams.get("page") || "1");

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/category/${categoryId}?&page=${value}`);
  };

  useEffect(() => {
    setSelectedCategory(categoryId);
    setSearchText("");
  }, [categoryId]);

  useEffect(() => {
    fetchBlogsByCategory(Number(categoryId), pageParam);
  }, [categoryId, pageParam]);

  return (
    <>
      {listBlogsByCategory &&
        listBlogsByCategory.map((blog) => (
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
            Search Results for: {selectedCategory?.name}
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

export default CategoryPageClientSide;
