import DetailBlogPageClientSide from "./DetailBlogPageClientSide";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const response = await fetch(`http://localhost:8000/api/v1/blog/${id}`).then(
    (res) => res.json()
  );
  const blog = response.data.blogReturn;

  return {
    title: blog.title,
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  return <DetailBlogPageClientSide id={id} />;
}
