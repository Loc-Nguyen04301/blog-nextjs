import { Metadata } from "next";

import dynamic from "next/dynamic";

const BlogPageWithNoSSR = dynamic(() => import("./BlogPage"), { ssr: false });

export const metadata: Metadata = {
  title: "Blog - Loc Nguyen Writer",
  description: "Blog - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

export default async function Page() {
  return <BlogPageWithNoSSR />;
}
