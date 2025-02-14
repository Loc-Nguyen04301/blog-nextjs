import { Metadata } from "next";
import BlogPageWrapper from "./BlogPageWrapper";

export const metadata: Metadata = {
  title: "Blog - Loc Nguyen Writer",
  description: "Blog - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

export default async function Page() {
  return <BlogPageWrapper />;
}
