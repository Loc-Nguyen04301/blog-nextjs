import { Metadata } from "next";
import BlogComponent from "./BlogComponent";

export const metadata: Metadata = {
  title: "Blog - Loc Nguyen Writer",
  description: "Blog - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

export default async function Page() {
  return (
    <>
      <BlogComponent />
    </>
  );
}
