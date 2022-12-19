export class CreateCommentDTO {
  foundUser!: number;
  comment!: string;
}

export class returnCommentDTO {
  comments!: comments[]
}

export interface comments {
  id: number,
  comment: string,
  user_id: number,
  nickname: string,
  created_at: Date,
  count_likes: number | null,
  is_liked?: number,
  is_owner?: boolean
}