import { myDataSource } from "../configs/typeorm_config";
import { CreatePostDTO, UpdatePostDTO, returnPostDTO } from "../dto/postDto";
import { Posts } from "../entities/post_entity";
import { Post_images } from "../entities/post_images_entity";
import { Post_likes } from "../entities/post_likes_entity";



const createPost = async (categoryId: number | undefined, postData: CreatePostDTO): Promise<void> => {
  await myDataSource.query(`
    INSERT INTO posts (user_id, content, category_id)
      VALUES(?, ?, ?); 
    INSERT INTO post_images (post_id, image_url)
      VALUES(LAST_INSERT_ID(), ?)`,
  [postData.foundUser, postData.content, categoryId, postData.images])
}


const getAllPosts = async (userId: number | null, offset: any, limit: any): Promise<returnPostDTO[]> => {
  let likeAndBookmark = ""
  let leftJoinWithLikes = ""
  let leftJoinWithBookmarks = ""

  if(userId != null) {
    likeAndBookmark = `, likes.is_liked as is_liked, bookmarks.is_marked as is_marked`
    leftJoinWithLikes = `LEFT JOIN (SELECT post_id, is_liked FROM post_likes WHERE user_id = ${userId}) likes ON p.id = likes.post_id`
    leftJoinWithBookmarks = `LEFT JOIN (SELECT post_id, is_marked FROM post_bookmarks WHERE user_id = ${userId}) bookmarks ON p.id = bookmarks.post_id`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, cate.name as category, p.category_id,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${likeAndBookmark}
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN categories cate ON p.category_id = cate.id
    ${leftJoinWithLikes}
    ${leftJoinWithBookmarks}
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    ORDER BY p.created_at DESC
    LIMIT ?, ?`, [+offset, +limit])
}


const getPostById = async (userId: number | null, postId: number): Promise<returnPostDTO[]> => {
  let likeAndBookmark = ""

  if(userId !== null) {
    likeAndBookmark = `, (SELECT is_liked FROM post_likes WHERE user_id = ${userId} AND post_id = ${postId}) as is_liked, 
  (SELECT is_marked FROM post_bookmarks WHERE user_id = ${userId} AND post_id = ${postId}) as is_marked`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, cate.name as category, p.category_id,
      p.content, p.created_at, pl.count_likes ${likeAndBookmark}, c.count_comments, c.comments
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN categories cate ON p.category_id = cate.id
    LEFT JOIN
      ( SELECT post_id, JSON_ARRAYAGG(JSON_OBJECT("id", id, "comment", comment)) as comments, COUNT(id) as count_comments 
        FROM comments GROUP BY post_id ) c ON p.id = c.post_id
    LEFT JOIN
      ( SELECT post_id, COUNT(id) as count_likes 
        FROM post_likes WHERE is_liked = 1 GROUP BY post_id ) pl ON p.id = pl.post_id 
    WHERE p.id = ?
  `, [postId]);
}


const updatePost = async(postId: number, categoryId: number | undefined, postData: UpdatePostDTO) => {
  await myDataSource.createQueryBuilder()
  .update(Posts)
  .set({
    content: postData.content,
    category_id: categoryId
  })
  .where("id = :postId", { postId })
  .execute()
}


const updatePostImages = async(postId: number, postImages: string | undefined) => {
  await myDataSource.createQueryBuilder()
    .update(Post_images)
    .set({
      image_url: postImages
    })
    .where("id = :postId", {postId})
    .execute()
}


const deletePost = async(postId: number) => {
  return await myDataSource.createQueryBuilder()
  .delete()
  .from(Posts)
  .where("id = :postId", { postId })
  .execute()
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
  updatePost,
  updatePostImages,
  deletePost,
  getPostLikesByUserPostId,
  insertPostLikes,
  updatePostLikeByUser,
  getPostLike
}