import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Comment_likes } from "./comment_likes_entity";
import { Posts } from "./post_entity";
import { Users } from "./user_entity";

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  user_id!: number;

  @Column("int")
  post_id!: number;

  @Column("varchar", { length: 200 })
  comment!: string;

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

  @OneToMany(() => Comment_likes, (comment_like) => comment_like.comment, {cascade: true})
  comment_likes!: Comment_likes[];

  @ManyToOne(() => Users, (user) => user.comments, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user!: Users;

  @ManyToOne(() => Posts, (post) => post.comments, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "post_id", referencedColumnName: 'id' })
  post!: Posts;
}