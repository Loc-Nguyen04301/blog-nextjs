import { Metadata } from "next";
import BlogComponent from "./BlogComponent";

export const metadata: Metadata = {
  title: "BLOG - Loc Nguyen Writer",
  description: "BLOG - Loc Nguyen Writer",
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
