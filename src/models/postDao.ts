import { myDataSource } from "../configs/typeorm_config";
import { PostDTO } from "../dto/postDto";
import { Posts } from "../entities/post_entity";
import { Post_likes } from "../entities/post_likes_entity";



const createPost = async (categoryId: number, postData: PostDTO): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .insert()
  .into(Posts)
  .values({
    user_id: postData.foundUser,
    category_id: categoryId,
    content: postData.content
  })
  .execute()
}


const getAllPosts = async (userId: number | null): Promise<object[]> => {
  let query = ""
  let select = ""

  if(userId != null) {
  select = `, likes.is_liked as is_liked`
  query = `LEFT JOIN (SELECT post_id, is_liked FROM post_likes WHERE user_id = ${userId}) likes ON p.id = likes.post_id`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, cate.name as category, p.category_id,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${select}
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN categories cate ON p.category_id = cate.id
    ${query}
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    ORDER BY p.created_at DESC`)
}


const getPostById = async (userId: number | null, postId: number): Promise<object> => {
  let query = ""
  if(userId !== null) {
  query = `, (SELECT is_liked FROM post_likes WHERE user_id = ${userId} AND post_id = ${postId}) as is_liked`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, cate.name as category, p.category_id,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${query}
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN categories cate ON p.category_id = cate.id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    WHERE p.id = ?
  `, [postId]);
}


const getPostLikesByUserPostId = async(userId: number, postId: number) => {
  return await myDataSource.query(`SELECT EXISTS (SELECT id FROM post_likes WHERE user_id = ? AND post_id = ?) as Exist`, [userId, postId])
}

const insertPostLikes = async(userId: number, postId: number) => {
  return await myDataSource.createQueryBuilder()
  .insert()
  .into(Post_likes)
  .values({
    user_id: userId,
    post_id: postId,
    is_liked: "1"
  })
  .execute()
}


const updatePostLikeByUser = async(userId: number, postId: number) => {
  await myDataSource.query(`
    UPDATE post_likes
    SET is_liked =
      CASE
        WHEN is_liked = 0 THEN 1
        WHEN is_liked = 1 THEN 0
      END
    WHERE user_id = ? AND post_id = ?
  `, [userId, postId])
}


const getPostLike = async(userId: number, postId: number) => {
  return await myDataSource.query(`
    SELECT 
      is_liked,
      (SELECT COUNT(id) FROM post_likes WHERE post_id = ? AND is_liked = 1 GROUP BY post_id) as count_likes
    FROM post_likes WHERE user_id = ? AND post_id = ?  
  `, [postId, userId, postId])
}


export default { 
  createPost,
  getAllPosts,
  getPostById,
  getPostLikesByUserPostId,
  insertPostLikes,
  updatePostLikeByUser,
  getPostLike
}