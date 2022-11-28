import { myDataSource } from "../configs/typeorm_config";
import { PostDTO } from "../dto/postDto";
import { Posts } from "../entities/post_entity";



const createPost = async (userId: number, categoryId: number, postData: PostDTO): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .insert()
  .into(Posts)
  .values({
    user_id: userId,
    category_id: categoryId,
    content: postData.content
  })
  .execute()
}


// 토큰 유무에 따라 좋아요, 북마크 표시 필요

const getAllPosts = async (): Promise<object[]> => {
  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, cate.name, p.category_id,
      p.content, p.created_at, c.count_comments, pl.count_likes
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN categories cate ON p.category_id = cate.id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes GROUP BY post_id) pl ON p.id = pl.post_id 
    ORDER BY p.created_at DESC`)
}


const getPostById = async (postId: number): Promise<object> => {
  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, cate.name, p.category_id,
      p.content, p.created_at, c.count_comments, pl.count_likes
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN categories cate ON p.category_id = cate.id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes GROUP BY post_id) pl ON p.id = pl.post_id 
    WHERE p.id = ?
  `, [postId]);
}


export default { createPost, getAllPosts, getPostById }