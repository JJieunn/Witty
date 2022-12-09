import { myDataSource } from "../configs/typeorm_config";
import { CreateCommentDTO } from "../dto/postDto";
import { Comments } from "../entities/comments_entity";
import { Comment_likes } from "../entities/comment_likes_entity";




const createComment = async(postId: number, commentData: CreateCommentDTO): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .insert()
  .into(Comments)
  .values({
    post_id: postId,
    user_id: commentData.foundUser,
    comment: commentData.comment
  })
  .execute()
}


const deleteComment = async(userId: number, commentId: number) => {
  return await myDataSource.createQueryBuilder()
  .delete()
  .from(Comments)
  .where("id = :commentId AND user_id = :userId", { commentId, userId })
  .execute()
}


const isCommentLikeExistedInEntity = async(userId: number, commentId: number) => {
  return await myDataSource.query(`SELECT EXISTS (SELECT id FROM comment_likes WHERE user_id = ? AND comment_id = ?) as Exist`, [userId, commentId])
}


const insertCommentLike = async(userId: number, commentId: number) => {
  return await myDataSource.createQueryBuilder()
  .insert()
  .into(Comment_likes)
  .values({
    user_id: userId,
    comment_id: commentId,
    is_liked: 1
  })
  .execute()
}


const updateCommentLikeByUser = async(userId: number, commentId: number) => {
  await myDataSource.query(`
  UPDATE comment_likes
  SET is_liked =
    CASE
      WHEN is_liked = 0 THEN 1
      WHEN is_liked = 1 THEN 0
    END
  WHERE user_id = ? AND comment_id = ?
`, [userId, commentId])
}


const getCommentLike = async(userId: number, commentId: number) => {
  return await myDataSource.query(`
  SELECT 
    is_liked,
    (SELECT COUNT(id) FROM comment_likes WHERE comment_id = ? AND is_liked = 1 GROUP BY comment_id) as count_likes
  FROM comment_likes WHERE user_id = ? AND comment_id = ?  
`, [commentId, userId, commentId])
}




export default { 
  createComment,
  deleteComment,
  isCommentLikeExistedInEntity,
  insertCommentLike,
  getCommentLike,
  updateCommentLikeByUser
}