import { useBlogStore } from "@/zustand/stores/blog-store";
import { useCategoryStore } from "@/zustand/stores/category-store";
import { useEffect } from "react";

const useFetchDataBlogLayout = () => {
  const { fetchCategories } = useCategoryStore((state) => state);
  const { fetchStatisticMonths } = useBlogStore((state) => state);

  useEffect(() => {
    fetchCategories();
    fetchStatisticMonths();
  }, [fetchCategories, fetchStatisticMonths]);

  return null;
};

export default useFetchDataBlogLayout;
