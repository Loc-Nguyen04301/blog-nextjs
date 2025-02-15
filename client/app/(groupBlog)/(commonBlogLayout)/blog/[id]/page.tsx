import DetailBlogPageClientSide from "./DetailBlogPageClientSide";
import { Metadata } from "next";
import { IBlogDetail } from "@/types/blog";
import BlogService from "@/services/BlogService";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const response = await BlogService.getCurrentBlog(id);

  const blog: IBlogDetail = response.data.data.blogReturn;
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: process.env.NEXT_PUBLIC_URL,
      siteName: `${process.env.NEXT_PUBLIC_URL}/blog/${id}`,
      images: [blog.thumbnail],
      type: "article",
      publishedTime: blog.createdAt || new Date().toISOString(),
      authors: ["Loc Nguyen", "Nguyen Gia Loc"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.thumbnail],
    },
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  return <DetailBlogPageClientSide id={id} />;
}
