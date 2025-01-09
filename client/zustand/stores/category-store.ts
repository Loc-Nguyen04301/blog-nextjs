import { ICategory } from "@/types/category";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useAlertStore } from "./alert-store";
import CategoryService from "@/services/Category";

interface CategoryState {
    listCategories: ICategory[];
    selectedCategory: string;
    fetchCategories: () => Promise<void>
    setSelectedCategory: (value: string) => void
}

export const useCategoryStore = create<CategoryState>()(
    devtools((set) => ({
        listCategories: [],
        selectedCategory: "",

        fetchCategories: async () => {
            try {
                const response = await CategoryService.getAllCategories()
                set({
                    listCategories: response.data.data.listCategoriesReturn,
                })
            } catch (error: any) {
                useAlertStore.getState().addError(error.response.data.message);
            }
        },
        setSelectedCategory: (value) => {
            set({ selectedCategory: value });
        }
    }), { name: 'CategoryStore' })
);
