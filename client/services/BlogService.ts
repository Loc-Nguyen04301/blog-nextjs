import api from "./axios"
import { BlogPageParams, CreateBlogData } from "@/types/blog"

const createBlog = (data: CreateBlogData) => {
    return api.post('/blog', data)
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