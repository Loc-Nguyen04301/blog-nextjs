export type IBlog = {
    title: string;
    thumnail: string | File;
    category: string[];
    content: string;
    description: string;
    createdAt: string;
}

export type CreateBlog = Omit<IBlog, 'createdAt'>;
