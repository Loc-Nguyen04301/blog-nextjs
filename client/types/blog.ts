export type IBlog = {
    title: string;
    thumbnail: string | File;
    categories: number[];
    content: string;
    description: string;
    createdAt: string;
}

export type CreateBlogData = Omit<IBlog, 'createdAt'>;
