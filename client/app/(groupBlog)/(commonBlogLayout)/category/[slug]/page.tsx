import React from "react";
import CategoryPageClientSide from "./CategoryPageClientSide";
import { Metadata } from "next";

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

  return (
    <>
      <CategoryPageClientSide slug={slug} />
    </>
  );
}
