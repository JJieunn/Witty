import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Posts } from "./post_entity";

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 25 })
  name!: string;

  @Column("char", { length: 1 })
  is_active!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  // @OneToMany(() => Posts, (post) => post.category )
  // posts!: Posts[];
}