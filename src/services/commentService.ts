import { CreateCommentDTO } from "../dto/postDto";
import commentDao from "../models/commentDao";




const createComment = async(postId: number, commentData: CreateCommentDTO) => {
  await commentDao.createComment(postId, commentData);
}


const deleteComment = async(userId: number, commentId: number) => {
  return await commentDao.deleteComment(userId, commentId);
}


const updateCommentLike = async(userId: number, commentId: number) => {
  const [isLiked] = await commentDao.isCommentLikeExistedInEntity(userId, commentId);
  
  switch (isLiked.Exist) {
    case "0" :
      await commentDao.insertCommentLike(userId, commentId)
      const [case0] = await commentDao.getCommentLike(userId, commentId)
      case0.count_likes = +case0.count_likes;
      return case0;
    
    case "1" :
      await commentDao.updateCommentLikeByUser(userId, commentId)
      const [case1] = await commentDao.getCommentLike(userId, commentId)
      case1.count_likes = +case1.count_likes;
      if(case1.count_likes === null) { case1.count_likes = 0 }
      return case1;
  }
}




export default {
  createComment,
  deleteComment,
  updateCommentLike
}