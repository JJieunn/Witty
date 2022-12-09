import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import { CreateCommentDTO } from "../dto/postDto";
import commentService from "../services/commentService"




const createComment = asyncWrap (async (req: Request, res: Response) => {
  const postId = +req.params.post_id;
  const commentData: CreateCommentDTO = req.body;

  await commentService.createComment(postId, commentData)
  res.status(201).json({ message: "Comment_Created" })
})


const deleteComment = asyncWrap (async (req: Request, res: Response) => {
  const userId= req.body.foundUser;
  const commentId = +req.params.comment_id;

  await commentService.deleteComment(userId, commentId)
  res.status(204).json({ message: "Comment_Deleted" })
})


const updateCommentLike = asyncWrap (async (req: Request, res: Response) => {
  const userId= req.body.foundUser;
  const commentId = +req.params.comment_id;

  const state = await commentService.updateCommentLike(userId, commentId)
  res.status(200).json(state)
})



export default { 
  createComment,
  deleteComment,
  updateCommentLike
}