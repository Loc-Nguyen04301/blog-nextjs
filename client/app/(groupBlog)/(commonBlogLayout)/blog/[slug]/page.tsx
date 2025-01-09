import DetailBlogPageClientSide from "./DetailBlogPageClientSide";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <DetailBlogPageClientSide slug={slug} />
    </>
  );
}
