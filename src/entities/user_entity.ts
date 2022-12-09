import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Comments } from "./comments_entity";
import { Comment_likes } from "./comment_likes_entity";
import { Post_bookmarks } from "./post_bookmarks_entity";
import { Posts } from "./post_entity";
import { Post_likes } from "./post_likes_entity";

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { unique: true, length: 30 })
  account!: string;

  @Column("varchar", { length: 1500 })
  password!: string;
  
  @Column("varchar", { length: 15 })
  nickname!: string;

  @Column("varchar", { unique: true, length: 30 })
  email!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;

  @OneToMany(() => Posts, (post) => post.user)
  posts!: Posts[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments!: Comments[];

  @OneToMany(() => Comment_likes, (comment_like) => comment_like.user, {cascade: true})
  comment_likes!: Comment_likes[];

  @OneToMany(() => Post_likes, (post_like) => post_like.user, {cascade: true})
  post_likes!: Post_likes[];

  @OneToMany(() => Post_bookmarks, (post_bookmark) => post_bookmark.user, {cascade: true} )
  post_bookmarks!: Post_bookmarks[];
}