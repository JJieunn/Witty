import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Comments } from "./comments_entity";
import { Users } from "./user_entity";

@Entity('comment_likes')
export class Comment_likes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  user_id!: number;

  @Column("int")
  comment_id!: number;

  @Column("tinyint")
  is_liked!: number;

  @ManyToOne(() => Users, (user) => user.comment_likes, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user!: Users;

  @ManyToOne(() => Comments, (comment) => comment.comment_likes, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "comment_id", referencedColumnName: 'id' })
  comment!: Comments;
}