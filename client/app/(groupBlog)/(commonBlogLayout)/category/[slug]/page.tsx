import React from "react";
import CategoryPageClientSide from "./CategoryPageClientSide";

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
