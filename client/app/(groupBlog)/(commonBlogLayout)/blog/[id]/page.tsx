import DetailBlogPageClientSide from "./DetailBlogPageClientSide";
import { Metadata } from "next";
import { IBlogDetail } from "@/types/blog";
import BlogService from "@/services/BlogService";
import { useAlertStore } from "@/zustand/stores/alert-store";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  useAlertStore.getState().setLoading(true);
  try {
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
  } catch (error: any) {
    useAlertStore.getState().addError(error.response.data.message);

    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
      openGraph: {
        title: "Blog Not Found",
        description: "The requested blog could not be found.",
        url: process.env.NEXT_PUBLIC_URL,
        siteName: `${process.env.NEXT_PUBLIC_URL}/blog/${id}`,
        images: [`${process.env.NEXT_PUBLIC_URL}/default-thumbnail.jpg`],
        type: "article",
        publishedTime: new Date().toISOString(),
        authors: ["Unknown"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Not Found",
        description: "The requested blog could not be found.",
        images: [`${process.env.NEXT_PUBLIC_URL}/default-thumbnail.jpg`],
      },
    };
  }
}

export default async function Page({ params }: Props) {
  const id = params.id;
  return <DetailBlogPageClientSide id={id} />;
}
