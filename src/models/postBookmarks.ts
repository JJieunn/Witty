import { myDataSource } from "../configs/typeorm_config";
import { Post_bookmarks } from "../entities/post_bookmarks_entity";



const getPostBookmarkByUserPostId = async(userId: number, postId: number) => {
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


const getPostBookmark = async(userId: number, postId: number) => {
  return await myDataSource.query(`
    SELECT 
      is_marked
    FROM post_bookmarks WHERE user_id = ? AND post_id = ?  
  `, [userId, postId])
}



export default {
  getPostBookmarkByUserPostId,
  insertPostBookmarks,
  updatePostBookmark,
  getPostBookmark
}