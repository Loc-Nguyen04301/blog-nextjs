"use client";

import dynamic from "next/dynamic";

const BlogPageWithNoSSR = dynamic(() => import("./BlogPage"), { ssr: false });

export default function BlogPageWrapper() {
  return <BlogPageWithNoSSR />;
}
