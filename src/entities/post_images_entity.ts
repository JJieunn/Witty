import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Posts } from "./post_entity";

@Entity('post_images')
export class Post_images {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  post_id!: number;

  @Column("varchar", { length: 255 })
  image_url!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @ManyToOne(() => Posts, (post) => post.post_images )
  @JoinColumn({ name: "post_id", referencedColumnName: 'id' })
  post!: Posts;
}