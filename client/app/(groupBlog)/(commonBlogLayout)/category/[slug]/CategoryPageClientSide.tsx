"use client";
import { useBlogStore } from "@/zustand/stores/blog-store";
import { useCategoryStore } from "@/zustand/stores/category-store";
import React, { useEffect } from "react";

interface CategoryPageClientSide {
  slug: string;
}
const CategoryPageClientSide = ({ slug }: CategoryPageClientSide) => {
  const { setSelectedCategory, selectedCategory } = useCategoryStore(
    (state) => state
  );
  const { setSearchText } = useBlogStore((state) => state);

  useEffect(() => {
    setSelectedCategory(slug);
    setSearchText("");
  }, [slug]);

  return <div>CategoryPageClientSide</div>;
};

export default CategoryPageClientSide;
