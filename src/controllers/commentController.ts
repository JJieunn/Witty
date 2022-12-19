import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import { CreateCommentDTO } from "../dto/commentDto";
import commentService from "../services/commentService"




const createComment = asyncWrap (async (req: Request, res: Response) => {
  const postId = +req.params.post_id;
  const commentData: CreateCommentDTO = req.body;

  await commentService.createComment(postId, commentData)
  res.status(201).json({ message: "Comment_Created" })
})


const deleteComment = asyncWrap (async (req: Request, res: Response) => {
  const userId= req.body.foundUser;
  const postId = +req.params.post_id;
  const commentId = +req.params.comment_id;

  const comments = await commentService.deleteComment(userId, postId, commentId)
  res.status(200).json(comments)
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