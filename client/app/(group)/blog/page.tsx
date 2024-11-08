import { Metadata } from "next";
import BlogComponent from "./components/BlogComponent";

export const metadata: Metadata = {
  title: "BLOG - Loc Nguyen Writer",
  description: "BLOG - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};
const BlogPage = () => {
  return (
    <>
      <BlogComponent />
    </>
  );
};

export default BlogPage;
