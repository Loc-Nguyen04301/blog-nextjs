import api from "./axios"
import { BlogPageParams, CreateBlogData } from "@/types/blog"

const createBlog = (data: CreateBlogData) => {
    const dataDto = { ...data, categories: data.categories.map(c => Number(c)) }
    return api.post('/blog', dataDto)
}

const getAllBlogs = (params: BlogPageParams) => {
    return api.get("/blog", { params })
}

const getAllBlogsByCategory = (categoryId: number, params: BlogPageParams) => {
    return api.get(`/blog/category/${categoryId}`, { params })
}

const getCurrentBlog = (id: string) => {
    return api.get(`/blog/${id}`)
}

const getBlogStats = () => {
    return api.get(`/blog/stats/month`)
}

const getBlogsByMonth = (year: string, month: string) => {
    return api.get(`/blog/stats/month/${year}/${month}`)
}

const BlogService = {
    createBlog,
    getAllBlogs,
    getCurrentBlog,
    getAllBlogsByCategory,
    getBlogStats,
    getBlogsByMonth
}

export default BlogService