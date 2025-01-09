import api from "./axios"
import { BlogPageParams, CreateBlogData } from "@/types/blog"

const createBlog = (data: CreateBlogData) => {
    const dataDto = { ...data, categories: data.categories.map(c => Number(c)) }
    return api.post('/blog', dataDto)
}

const getAllBlogs = (params: BlogPageParams) => {
    return api.get("/blog", { params })
}

const getCurrentBlog = (id: string) => {
    return api.get(`/blog/${id}`)
}

const BlogService = {
    createBlog,
    getAllBlogs,
    getCurrentBlog
}

export default BlogService