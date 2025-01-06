import api from "./axios"
import { BlogPageParams, CreateBlogData } from "@/types/blog"

const createBlog = (data: CreateBlogData) => {
    return api.post('/blog', data)
}

const getAllBlogs = (params: BlogPageParams) => {
    return api.get("/blog", { params })
}

const BlogService = {
    createBlog,
    getAllBlogs
}

export default BlogService