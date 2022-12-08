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
  comments: object[],
  count_likes: number | string | null,
  is_liked?: number | string | null,
  is_marked?: number | string | null,
  is_owner?: boolean
}