import BlogDetailComponent from "./BlogDetailComponent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <BlogDetailComponent slug={slug} />
    </>
  );
}
