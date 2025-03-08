export type IVideoDetail = {
    id: string
    title: string;
    description: string;
    videoUrl: string;
    videoTags: string[];
    viewers: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface VideoPageParams {
    page?: number;
    itemsPerPage?: number;
}