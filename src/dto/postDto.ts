import { comments } from "./commentDto";

export class CreatePostDTO {
  foundUser!: number;
  category!: string[];
  content!: string;
  images?: string[];
}

export class UpdatePostDTO {
  foundUser!: number;
  category?: string[];
  content?: string;
  images?: string[];
}

export interface returnPostDTO {
  id: number,
  nickname: string,
  user_id: number,
  category: string,
  content: string,
  created_at: Date,
  count_comments: number | string | null,
  count_likes: number | string | null,
  is_liked?: number | string | null,
  is_marked?: number | string | null,
  is_owner?: boolean
}

export interface postDTO {
  post: returnPostDTO,
  comments?: comments[]
}

export interface returnPostLikeDTO {
  count_likes: number | string,
  is_liked: number
}

export interface returnBookmarkDTO {
  is_marked: number
}