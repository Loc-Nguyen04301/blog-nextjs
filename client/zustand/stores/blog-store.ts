import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBlog } from '@/types/blog';
import BlogService from '@/services/BlogService';
import { useAlertStore } from './alert-store';


interface BlogState {
    listBlogs: IBlog[];
    total: number;
    page: number;
    pageNumbers: number;
    fetchBlog: (page?: number, search?: string) => Promise<void>
}

export const useBlogStore = create<BlogState>()(
    devtools((set) => ({
        blogs: [],
        totalPages: 1,
        fetchBlog: async (page, keyword) => {
            try {
                const response = await BlogService.getAllBlogs({ page, keyword })
                set({
                    listBlogs: response.data.data.listBlogs,
                    total: response.data.data.total,
                    page: response.data.data.page,
                    pageNumbers: response.data.data.pageNumbers,
                })
            } catch (error: any) {
                useAlertStore.getState().addError(error.response.data.message);
            }
        },
    }), { name: 'BlogStore' })
);
