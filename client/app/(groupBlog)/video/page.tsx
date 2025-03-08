import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video - Loc Nguyen Writer",
  description: "Video - Loc Nguyen Writer",
};

const VideoListPageWithNoSSR = dynamic(() => import("./VideoListPage"));

export default async function Page() {
  return <VideoListPageWithNoSSR />;
}
