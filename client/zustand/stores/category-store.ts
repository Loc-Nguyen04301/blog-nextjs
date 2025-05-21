import { ICategory } from "@/types/category";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useAlertStore } from "./alert-store";
import CategoryService from "@/services/Category";
import BlogService from "@/services/BlogService";
import { IBlog } from "@/types/blog";

interface CategoryState {
    listCategories: ICategory[] | null;
    selectedCategory: string;
    fetchCategories: () => Promise<void>
    setSelectedCategory: (value: string) => void

    listBlogsByCategory: IBlog[],
    total: number,
    page: number,
    pageNumbers: number,
    fetchBlogsByCategory: ({ categoryId, itemsPerPage, page }: { categoryId: number, page?: number, itemsPerPage?: number }) => Promise<void>
}

export const useCategoryStore = create<CategoryState>()(
    devtools((set) => ({
        listCategories: null,
        selectedCategory: "",

        listBlogsByCategory: null,
        total: null,
        page: null,
        pageNumbers: null,

        fetchCategories: async () => {
            useAlertStore.getState().setLoading(true)
            try {
                const response = await CategoryService.getAllCategories()
                set({
                    listCategories: response.data.data.listCategoriesReturn,
                })
            } catch (error: any) {
                useAlertStore.getState().addError(error.response.data.message);
            }
            finally {
                useAlertStore.getState().setLoading(false)
            }
        },

        fetchBlogsByCategory: async ({ categoryId, itemsPerPage, page }: { categoryId: number, page?: number, itemsPerPage?: number }) => {
            useAlertStore.getState().setLoading(true)
            try {
                const response = await BlogService.getAllBlogsByCategory(categoryId, { page, itemsPerPage })
                set({
                    listBlogsByCategory: response.data.data.listBlogsByCategory,
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
        setSelectedCategory: (value) => {
            set({ selectedCategory: value });
        }
    }), { name: 'CategoryStore' })
);
