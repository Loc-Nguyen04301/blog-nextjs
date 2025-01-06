export type IBlogDetail = {
    id: string
    title: string;
    thumbnail: string | File;
    categories: number[];
    content: string;
    description: string;
    createdAt: string;
}

export type CreateBlogFormValues = {
    title: string;
    thumbnail: string | File;
    categories: string[];
    content: string;
    description: string;
}

export type IBlog = Omit<IBlogDetail, 'content'>;

export type CreateBlogData = Omit<IBlogDetail, 'createdAt' | 'id'>;

export interface BlogPageParams {
    page?: number;
    itemsPerPage?: number;
    keyword?: string
}
