import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const CategoryPageWithNoSSR = dynamic(() => import("./CategoryPage"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Mục lục - Loc Nguyen Writer",
  description: "Mục lục - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return <CategoryPageWithNoSSR slug={slug} />;
}
