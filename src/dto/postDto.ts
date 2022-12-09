export class CreatePostDTO {
  foundUser!: number;
  category!: string;
  content!: string;
  images?: string;
}

export class UpdatePostDTO {
  foundUser!: number;
  category?: string;
  content?: string;
  images?: string;
}

export interface returnPostDTO {
  id: number,
  nickname: string,
  user_id: number,
  category: string,
  category_id: number,
  content: string,
  created_at: Date,
  count_comments: number | string | null,
  comments: commentsDTO[],
  count_likes: number | string | null,
  is_liked?: number | string | null,
  is_marked?: number | string | null,
  is_owner?: boolean
}

export interface commentsDTO {
  id: number,
  comment: string,
  user_id: number,
  nickname: string,
  created_at: Date,
  is_owner?: boolean
}

export interface returnPostLikeDTO {
  count_likes: number | string,
  is_liked: number | string
}

export interface returnBookmarkDTO {
  is_marked: number | string
}