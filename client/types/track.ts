import { StaticImageData } from "next/image";

export interface Track {
    title: string;
    src: string;
    author: string;
    thumbnail?: string | StaticImageData;
}