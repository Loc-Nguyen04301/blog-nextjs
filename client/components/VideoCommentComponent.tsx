"use client";
import React, { useEffect, useState } from "react";
import { IComment } from "@/types/comment";
import CommentService from "@/services/CommentService";
import { CircularProgress } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useAlertStore } from "@/zustand/stores/alert-store";

interface VideoCommentComponentProps {
  id: string;
}

const VideoCommentComponent = ({ id }: VideoCommentComponentProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setLoading, loading } = useAlertStore();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await CommentService.getCommentsByVideo(id);
        setComments(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id, setLoading]);

  const handleAddComment = async () => {
    if (!description.trim()) return;
    setSubmitting(true);
    setLoading(true);
    try {
      const response = await CommentService.createComment({
        description,
        videoId: id,
      });
      setComments((prev) => [response.data.data, ...prev]);
      setDescription("");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl font-sans text-left">
      <h3 className="text-xl font-bold border-b-2 border-[#9e6a2d] inline-block mb-6 pb-1">
        COMMENTS ({comments.length})
      </h3>

      {loading ? (
        <div className="flex justify-center py-6">
          <CircularProgress size={24} />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 text-sm mb-6">Chưa có bình luận nào.</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                {comment.user.avatar ? (
                  <Image
                    src={comment.user.avatar}
                    alt={comment.user.username}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold uppercase">
                    {comment.user.username?.[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#9e6a2d]">
                    {comment.user.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-gray-700 mt-1 leading-relaxed">
                  {comment.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="mt-5 bg-gray-50 p-6 rounded-lg border-t-4 border-[#9e6a2d]">
        <h4 className="text-sm font-bold uppercase mb-4 tracking-widest">
          Leave a Comment
        </h4>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9e6a2d] min-h-[100px]"
        />
        <button
          onClick={handleAddComment}
          disabled={submitting || !description.trim()}
          className="mt-4 bg-[#9e6a2d] text-white px-6 py-2 rounded-sm text-sm font-bold uppercase hover:bg-[#855825] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            "Post Comment"
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCommentComponent;
