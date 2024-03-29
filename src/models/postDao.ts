import { myDataSource } from "../configs/typeorm_config";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreatePostDTO, UpdatePostDTO, returnPostDTO } from "../dto/postDto";
import { returnCommentDTO } from "../dto/commentDto";
import { Posts } from "../entities/post_entity";
import { Post_images } from "../entities/post_images_entity";




const createPost = async (categoryId: string, postData: CreatePostDTO): Promise<void> => {
  await myDataSource.createQueryBuilder()
    .insert()
    .into(Posts)
    .values({ 
      user_id: postData.foundUser,
      content: postData.content,
      category_id: categoryId
    })
    .execute()
}


const createPostImages = async (userId: number, postImage: string): Promise<void> => {
  const [postId] = await myDataSource.query(`SELECT MAX(id) as id FROM posts WHERE user_id = ?`, [userId])
  
  await myDataSource.createQueryBuilder()
    .insert()
    .into(Post_images)
    .values({
      post_id: postId,
      image_url: postImage
    })
    .execute()
}


const getAllPosts = async (userId: number | null, offset: any): Promise<returnPostDTO[]> => {
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
      p.id, u.nickname, p.user_id, p.category_id as category,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${likeAndBookmark}, pi.images
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ${leftJoinWithLikes}
    ${leftJoinWithBookmarks}
    LEFT JOIN (SELECT post_id, JSON_ARRAYAGG(image_url) as images FROM post_images GROUP BY post_id) pi ON p.id = pi.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    ORDER BY p.created_at DESC
    LIMIT ?, 12`, [+offset * 12])
}


const getPostById = async (userId: number | null, postId: number): Promise<returnPostDTO[]> => {
  let likeAndBookmark = ""

  if(userId !== null) {
    likeAndBookmark = `, (SELECT is_liked FROM post_likes WHERE user_id = ${userId} AND post_id = ${postId}) as is_liked, 
  (SELECT is_marked FROM post_bookmarks WHERE user_id = ${userId} AND post_id = ${postId}) as is_marked`
  }

  return await myDataSource.query(`
  SELECT 
    p.id, u.nickname, p.user_id, p.category_id as category, p.content, p.created_at, pl.count_likes, c.count_comments 
    ${likeAndBookmark}, pi.images
  FROM posts p
  JOIN users u ON p.user_id = u.id
  LEFT JOIN 
    ( SELECT post_id, JSON_ARRAYAGG(image_url) as images FROM post_images GROUP BY post_id ) pi ON p.id = pi.post_id

  LEFT JOIN
    ( SELECT post_id, COUNT(id) as count_likes 
      FROM post_likes WHERE is_liked = 1 GROUP BY post_id ) pl ON p.id = pl.post_id 

  LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
  WHERE p.id = ?
  `, [postId])
}


const getCommentsByPost = async(userId: number | null, postId: number): Promise<returnCommentDTO[]> => {
  let is_liked = ""
  let leftJoinWithLikes = ""

  if(userId !== null) {
    is_liked = `"is_liked", c_likes.is_liked,`
    leftJoinWithLikes = `LEFT JOIN (SELECT comment_id, is_liked FROM comment_likes WHERE user_id = ${userId}) c_likes ON c.id = c_likes.comment_id`
  }

  return await myDataSource.query(`
    SELECT
    JSON_ARRAYAGG(
      JSON_OBJECT(
        "id", c.id, "user_id", user_id, "nickname", u.nickname,
        "count_likes", likes.count_likes, "comment", comment,
        ${is_liked}
        "created_at", c.created_at)) as comments
    FROM comments c 
    JOIN users u ON c.user_id = u.id
    ${leftJoinWithLikes}
    LEFT JOIN 
      ( SELECT comment_id, COUNT(id) as count_likes FROM comment_likes WHERE is_liked = 1 GROUP BY comment_id) likes ON c.id = likes.comment_id
    WHERE post_id = ?
    GROUP BY post_id
  `, [postId])
}


const updatePost = async(postId: number, category: string | undefined, postData: UpdatePostDTO): Promise<UpdateResult> => {
  return await myDataSource.createQueryBuilder()
  .update(Posts)
  .set({
    content: postData.content,
    category_id: category
  })
  .where("id = :postId AND user_id = :userId", { postId, userId: postData.foundUser })
  .execute()
}


const getDatasByPostId = async(postId: number): Promise<returnPostDTO[]> => {
  return await myDataSource.query(`
  SELECT 
    p.id, p.category_id as category, p.content, pi.images as file
  FROM posts p
  LEFT JOIN 
    ( SELECT post_id, JSON_ARRAYAGG(image_url) as images FROM post_images GROUP BY post_id ) pi ON p.id = pi.post_id
  WHERE p.id = ?
  `, [postId])
}


const deletePostImages = async(postId: number): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .delete()
  .from(Post_images)
  .where("post_id = :postId", { postId })
  .execute()
}


const updatePostImages = async(postId: number, postImage: string): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .insert()
  .into(Post_images)
  .values({
    post_id: postId,
    image_url: postImage
  })
  .execute()
}


const deletePost = async(userId: number | null, postId: number): Promise<DeleteResult> => {
  return await myDataSource.createQueryBuilder()
  .delete()
  .from(Posts)
  .where("id = :postId AND user_id = :userId", { postId, userId })
  .execute()
}




export default { 
  createPost,
  createPostImages,
  getAllPosts,
  getPostById,
  getCommentsByPost,
  updatePost,
  getDatasByPostId,
  deletePostImages,
  updatePostImages,
  deletePost
}