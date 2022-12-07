import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import { CreatePostDTO, UpdatePostDTO } from "../dto/postDto";
import postService from "../services/postService"



const createPost = asyncWrap (async (req: Request, res: Response) => {
  const postData: CreatePostDTO = req.body;

  await postService.createPost(postData);
  res.status(201).json({ message: "Post_Created" })
})


const getAllPosts = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;

  const posts = await postService.getAllPosts(userId);
  res.status(200).json(posts)
})


const getPostById = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;
  const postId = +req.params.post_id;

  const post = await postService.getPostById(userId, postId);
  res.status(200).json(post)
})


const updatePost = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;
  const postId = +req.params.post_id;
  const postData: UpdatePostDTO = req.body;

  const post = await postService.updatePost(userId, postId, postData)
  res.status(200).json(post)
})


const deletePost = asyncWrap (async (req: Request, res: Response) => {
  const postId = +req.params.post_id;

  await postService.deletePost(postId);
  res.status(204).json({ message: "Delete_Success" })
})


const updatePostLikeByUser = asyncWrap (async (req: Request, res: Response) => {
  const userId= req.body.foundUser;
  const postId = +req.params.post_id;

  const state = await postService.updatePostLikeByUser(userId, postId)
  res.status(200).json(state)
})


const updatePostBookmark = asyncWrap (async (req: Request, res: Response) => {
  const userId= req.body.foundUser;
  const postId = +req.params.post_id;

  const state = await postService.updatePostBookmark(userId, postId)
  res.status(200).json(state)
})




export default { 
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  updatePostLikeByUser,
  updatePostBookmark
}