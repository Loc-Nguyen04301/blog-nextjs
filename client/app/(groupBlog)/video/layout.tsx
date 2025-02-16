import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video - Loc Nguyen Writer",
  description: "Video - Loc Nguyen Writer",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 min-h-[100vh]">
      <div className="col-span-12 max-md:col-span-12">{children}</div>
    </div>
  );
}
