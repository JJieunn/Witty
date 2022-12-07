import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categories } from "./category_entity";
import { Comments } from "./comments_entity";
import { Post_images } from "./post_images_entity";
import { Post_likes } from "./post_likes_entity";
import { Users } from "./user_entity";
import { Post_bookmarks } from "./post_bookmarks_entity";

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { nullable: true, length: 140 })
  content!: string;

  @Column("int")
  user_id!: number;

  @Column("int")
  category_id!: number;

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

  @ManyToOne(() => Users, (user) => user.posts )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user!: Users;

  @ManyToOne(() => Categories, (category) => category.posts )
  @JoinColumn({ name: "category_id", referencedColumnName: 'id' })
  category!: Categories;

  @OneToMany(() => Comments, (comment) => comment.post )
  comments!: Comments[];

  @OneToMany(() => Post_likes, (post_like) => post_like.post )
  post_likes!: Post_likes[];

  @OneToMany(() => Post_images, (post_image) => post_image.post, {cascade: true} )
  post_images!: Post_images[];

  @OneToMany(() => Post_bookmarks, (post_bookmark) => post_bookmark.post, {cascade: true} )
  post_bookmarks!: Post_bookmarks[];
}