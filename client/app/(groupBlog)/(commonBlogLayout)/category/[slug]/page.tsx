import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { useCategoryStore } from "@/zustand/stores/category-store";

const CategoryPageWithNoSSR = dynamic(() => import("./CategoryPage"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Access Zustand store on the server
  const { listCategories } = useCategoryStore.getState();
  const selectedCategoryName = listCategories?.find(
    (c) => c.id === Number(params.slug)
  )?.name;

  return {
    title: selectedCategoryName
      ? `${selectedCategoryName} - Mục lục`
      : "Mục lục - Loc Nguyen Writer",
    description: selectedCategoryName
      ? `${selectedCategoryName} - Mục lục`
      : "Mục lục - Loc Nguyen Writer",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return <CategoryPageWithNoSSR slug={slug} />;
}
