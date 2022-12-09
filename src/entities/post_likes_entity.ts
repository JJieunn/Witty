import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Posts } from "./post_entity";
import { Users } from "./user_entity";

@Entity('post_likes')
export class Post_likes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  user_id!: number;

  @Column("int")
  post_id!: number;

  @Column("tinyint")
  is_liked!: number;

  @ManyToOne(() => Users, (user) => user.post_likes, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user!: Users;

  @ManyToOne(() => Posts, (post) => post.post_likes, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "post_id", referencedColumnName: 'id' })
  post!: Posts;
}