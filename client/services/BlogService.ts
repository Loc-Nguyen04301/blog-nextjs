import api from "./axios"
import { CreateBlogData } from "@/types/blog"

const createBlog = (data: CreateBlogData) => {
    return api.post('/blog', data)
}

const BlogService = {
    createBlog
}

export default BlogService