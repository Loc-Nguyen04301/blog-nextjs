import { VideoPageParams } from "@/types/video"
import api from "./axios"

// const createBlog = (data: CreateBlogData) => {
//     const dataDto = { ...data, categories: data.categories.map(c => Number(c)) }
//     return api.post('/blog', dataDto)
// }

const getAllVideos = (params: VideoPageParams) => {
    return api.get("/video", { params })
}

// const getAllBlogsByCategory = (categoryId: number, params?: BlogPageParams) => {
//     return api.get(`/blog/category/${categoryId}`, { params })
// }

// const getCurrentBlog = (id: string) => {
//     return api.get(`/blog/${id}`)
// }

// const getBlogStats = () => {
//     return api.get(`/blog/stats/month`)
// }

// const getBlogsByMonth = (year: string, month: string, params?: BlogByMonthPageParams) => {
//     return api.get(`/blog/stats/month/${year}/${month}`, { params })
// }

const VideoService = {
    getAllVideos,
}

export default VideoService