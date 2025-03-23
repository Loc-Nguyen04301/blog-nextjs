import { Metadata } from "next";
import dynamic from "next/dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { search?: string };
}): Promise<Metadata> {
  const searchKeyword = searchParams.search;
  return {
    title: searchKeyword
      ? `${searchKeyword} - Tìm kiếm blog`
      : "Blog - Loc Nguyen Writer",
    description: searchKeyword
      ? `${searchKeyword} - Tìm kiếm blog`
      : "Blog - Loc Nguyen Writer",
    icons: {
      icon: "favicon.ico",
    },
  };
}

const BlogPageWithNoSSR = dynamic(() => import("./BlogPage"), { ssr: false });

export default async function Page() {
  return <BlogPageWithNoSSR />;
}
