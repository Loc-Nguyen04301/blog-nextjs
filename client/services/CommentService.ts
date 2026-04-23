import api from "./axios";
import { CreateCommentDto, UpdateCommentDto } from "@/types/comment";

const getCommentsByBlog = (blogId: string) => {
  return api.get(`/comment/blog/${blogId}`);
};

const getCommentsByVideo = (videoId: string) => {
  return api.get(`/comment/video/${videoId}`);
};

const createComment = (dto: CreateCommentDto) => {
  return api.post("/comment", dto);
};

const updateComment = (id: string, dto: UpdateCommentDto) => {
  return api.patch(`/comment/${id}`, dto);
};

const deleteComment = (id: string) => {
  return api.delete(`/comment/${id}`);
};

const CommentService = {
  getCommentsByBlog,
  getCommentsByVideo,
  createComment,
  updateComment,
  deleteComment,
};

export default CommentService;
