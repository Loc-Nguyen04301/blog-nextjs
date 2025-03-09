import { useAlertStore } from "@/zustand/stores/alert-store";
import DetailVideoPageClientSide from "./DetailVideoPageClientSide";
import { Metadata } from "next";
import VideoService from "@/services/VideoService";
import { IVideoDetail } from "@/types/video";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  useAlertStore.getState().setLoading(true);
  try {
    const response = await VideoService.getVideosById(id);
    const video: IVideoDetail = response.data.video;
    return {
      title: video.title,
      description: video.description,
      openGraph: {
        title: video.title,
        description: video.description,
        url: process.env.NEXT_PUBLIC_URL,
        siteName: `${process.env.NEXT_PUBLIC_URL}/blog/${id}`,
        type: "article",
        publishedTime: (video.createdAt as string) || new Date().toISOString(),
        authors: ["Loc Nguyen", "Nguyen Gia Loc"],
      },
      twitter: {
        card: "summary_large_image",
        title: video.title,
        description: video.description,
      },
    };
  } catch (error: any) {
    console.log({ error });
    // useAlertStore.getState().addError(error.response.data.message);

    return {
      title: "Video Not Found",
      description: "The requested video could not be found.",
      openGraph: {
        title: "Video Not Found",
        description: "The requested video could not be found.",
        url: process.env.NEXT_PUBLIC_URL,
        siteName: `${process.env.NEXT_PUBLIC_URL}/video/${id}`,
        images: [`${process.env.NEXT_PUBLIC_URL}/default-thumbnail.jpg`],
        type: "article",
        publishedTime: new Date().toISOString(),
        authors: ["Unknown"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Video Not Found",
        description: "The requested blog could not be found.",
        images: [`${process.env.NEXT_PUBLIC_URL}/default-thumbnail.jpg`],
      },
    };
  }
}

export default async function Page({ params }: Props) {
  const id = params.id;
  return <DetailVideoPageClientSide id={id} />;
}
