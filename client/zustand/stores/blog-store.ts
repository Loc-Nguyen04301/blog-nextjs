import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBlog, IBlogDetail } from '@/types/blog';
import BlogService from '@/services/BlogService';
import { useAlertStore } from './alert-store';

interface BlogState {
    listBlogs: IBlog[];
    total: number;
    page: number;
    pageNumbers: number;
    currentBlog: IBlogDetail;
    fetchBlog: (page?: number, search?: string) => Promise<void>
    fetchDetailBlog: (id: string) => Promise<void>
}

export const useBlogStore = create<BlogState>()(
    devtools((set) => ({
        listBlogs: [],
        total: null,
        page: null,
        pageNumbers: null,
        currentBlog: null,

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

        fetchDetailBlog: async (id) => {
            try {
                const response = await BlogService.getCurrentBlog(id)
                set({
                    currentBlog: response.data.data.blogReturn
                })
            } catch (error: any) {
                useAlertStore.getState().addError(error.response.data.message);
            }
        },
    }), { name: 'BlogStore' })
);
