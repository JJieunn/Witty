import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Posts } from "./post_entity";
import { Users } from "./user_entity";

@Entity('post_bookmarks')
export class Post_bookmarks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  user_id!: number;

  @Column("int")
  post_id!: number;

  @Column("char", { length: 1 })
  is_marked!: string;

  @ManyToOne(() => Users, (user) => user.post_bookmarks, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user!: Users;

  @ManyToOne(() => Posts, (post) => post.post_bookmarks, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "post_id", referencedColumnName: 'id' })
  post!: Posts;
}