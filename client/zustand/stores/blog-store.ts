import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBlog, IBlogDetail, IStatisticMonth } from '@/types/blog';
import BlogService from '@/services/BlogService';
import { useAlertStore } from './alert-store';

interface BlogState {
    listBlogs: IBlog[];
    total: number;
    page: number;
    pageNumbers: number;
    currentBlog: IBlogDetail;
    fetchBlogs: (page?: number, search?: string) => Promise<void>
    fetchDetailBlog: (id: string) => Promise<void>

    searchText: string;
    setSearchText: (text: string) => void;

    statisticMonths: IStatisticMonth[];
    fetchStatisticMonths: () => void;
}

export const useBlogStore = create<BlogState>()(
    devtools((set) => ({
        listBlogs: null,
        total: null,
        page: null,
        pageNumbers: null,
        currentBlog: null,
        searchText: "",
        statisticMonths: null,

        fetchBlogs: async (page, keyword) => {
            useAlertStore.getState().setLoading(true)
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
            finally {
                useAlertStore.getState().setLoading(false)
            }
        },
        fetchDetailBlog: async (id) => {
            useAlertStore.getState().setLoading(true)
            try {
                const response = await BlogService.getCurrentBlog(id)
                set({
                    currentBlog: response.data.data.blogReturn
                })
            } catch (error: any) {
                useAlertStore.getState().addError(error.response.data.message);
            }
            finally {
                useAlertStore.getState().setLoading(false)
            }
        },
        fetchStatisticMonths: async () => {
            try {
                const response = await BlogService.getBlogStats()
                set({
                    statisticMonths: response.data.data.statisticMonths
                })
            } catch (error: any) {
                useAlertStore.getState().addError(error.response.data.message);
            }
        },
        setSearchText: (text) => {
            set({ searchText: text });
        },
    }), { name: 'BlogStore' })
);
