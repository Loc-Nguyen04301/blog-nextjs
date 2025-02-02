import { Metadata } from "next";
import dynamic from "next/dynamic";

const CreateBlogPage = dynamic(() => import("./CreateBlogPage"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Tạo Blog - Loc Nguyen Writer",
  description: "Tạo Blog - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

export default function Page() {
  return <CreateBlogPage />;
}
