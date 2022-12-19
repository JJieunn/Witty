import { CreateCommentDTO, returnCommentDTO } from "../dto/commentDto";
import postDao from "../models/postDao";
import commentDao from "../models/commentDao";




const createComment = async(postId: number, commentData: CreateCommentDTO) => {
  await commentDao.createComment(postId, commentData);
}


const deleteComment = async(userId: number, postId: number, commentId: number) => {
  await commentDao.deleteComment(userId, commentId);
  const [commentList] = await postDao.getCommentsByPost(userId, postId);
  let result: returnCommentDTO = {
    comments: []
  }

  if(commentList !== undefined) {
    if(userId !== null && commentList.comments.length !== 0) {
      commentList.comments.map((comment) => {
        if(comment.user_id === userId) { comment.is_owner = true }
        else if (comment.user_id !== userId) { comment.is_owner = false }

        if(comment.is_liked !== null && comment.is_liked !== undefined) comment.is_liked = +comment.is_liked
      })
    }

    result.comments = commentList.comments;
  } 
  else if(commentList === undefined) result.comments = [];
  
  return result.comments;
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