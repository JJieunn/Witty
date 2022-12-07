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