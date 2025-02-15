import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Blog - Loc Nguyen Writer",
  description: "Blog - Loc Nguyen Writer",
};

const BlogPageWithNoSSR = dynamic(() => import("./BlogPage"), { ssr: false });

export default async function Page() {
  return <BlogPageWithNoSSR />;
}
