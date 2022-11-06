import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Comments } from "./comments_entity";
import { Posts } from "./post_entity";

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

  @OneToMany(() => Posts, (post_like) => post_like.user)
  post_likes!: Posts[];
}