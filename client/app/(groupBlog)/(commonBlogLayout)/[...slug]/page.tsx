import { Metadata } from "next";
import React from "react";
import BlogByMonthClientSide from "./BlogByMonthClientSide";

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
      <BlogByMonthClientSide slug={slug} />
    </>
  );
}
