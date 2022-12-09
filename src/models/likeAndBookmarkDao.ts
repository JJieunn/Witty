import { myDataSource } from "../configs/typeorm_config";
import { InsertResult } from "typeorm";
import { returnBookmarkDTO, returnPostLikeDTO } from "../dto/postDto";
import { Post_bookmarks } from "../entities/post_bookmarks_entity";
import { Post_likes } from "../entities/post_likes_entity";




// Post Likes
const isPostLikeExistedInEntity = async(userId: number, postId: number) => {
  return await myDataSource.query(`SELECT EXISTS (SELECT id FROM post_likes WHERE user_id = ? AND post_id = ?) as Exist`, [userId, postId])
}


const insertPostLike = async(userId: number, postId: number): Promise<InsertResult> => {
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


const updatePostLikeByUser = async(userId: number, postId: number): Promise<void> => {
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


const getPostLike = async(userId: number, postId: number): Promise<returnPostLikeDTO[]> => {
  return await myDataSource.query(`
    SELECT 
      is_liked,
      (SELECT COUNT(id) FROM post_likes WHERE post_id = ? AND is_liked = 1 GROUP BY post_id) as count_likes
    FROM post_likes WHERE user_id = ? AND post_id = ?  
  `, [postId, userId, postId])
}




// Post Bookmarks
const isBookmarkExistedInEntity = async(userId: number, postId: number) => {
  return await myDataSource.query(`SELECT EXISTS (SELECT id FROM post_bookmarks WHERE user_id = ? AND post_id = ?) as Exist`, [userId, postId])
}


const insertPostBookmarks = async(userId: number, postId: number): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .insert()
  .into(Post_bookmarks)
  .values({
    user_id: userId,
    post_id: postId,
    is_marked: "1"
  })
  .execute()
}


const updatePostBookmark = async(userId: number, postId: number): Promise<void> => {
  await myDataSource.query(`
    UPDATE post_bookmarks
    SET is_marked =
      CASE
        WHEN is_marked = 0 THEN 1
        WHEN is_marked = 1 THEN 0
      END
    WHERE user_id = ? AND post_id = ?
  `, [userId, postId])
}


const getPostBookmark = async(userId: number, postId: number): Promise<returnBookmarkDTO[]> => {
  return await myDataSource.query(`
    SELECT 
      is_marked
    FROM post_bookmarks WHERE user_id = ? AND post_id = ?  
  `, [userId, postId])
}




export default {
  isPostLikeExistedInEntity,
  insertPostLike,
  updatePostLikeByUser,
  getPostLike,
  isBookmarkExistedInEntity,
  insertPostBookmarks,
  updatePostBookmark,
  getPostBookmark
}