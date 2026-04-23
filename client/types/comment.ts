export interface ICommentUser {
  id: string;
  username: string;
  avatar: string | null;
}

export interface IComment {
  id: string;
  description: string;
  createdAt: string;
  user: ICommentUser;
}

export interface ICommentUpdated {
  id: string;
  description: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  description: string;
  blogId?: string;
  videoId?: string;
}

export interface UpdateCommentDto {
  description: string;
}
