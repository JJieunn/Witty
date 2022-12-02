import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import { PostDTO } from "../dto/postDto";
import postService from "../services/postService"



const createPost = asyncWrap (async (req: Request, res: Response) => {
  const postData: PostDTO = req.body;
  let category_id = 1;

  await postService.createPost(category_id, postData);
  res.status(201).json({ message: "Post_Created" })
})


const getAllPosts = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;

  const posts = await postService.getAllPosts(userId);
  res.status(200).json(posts)
})


const getPostById = asyncWrap (async (req: Request, res: Response) => {
  const userId: number | null = req.body.foundUser;
  let postId = req.params.post_id;
  let numPostId = +postId;

  const post = await postService.getPostById(userId, numPostId);
  res.status(200).json(post)
})


const updatePostLikeByUser = asyncWrap (async (req: Request, res: Response) => {
  const userId= req.body.foundUser;
  const postId = req.params.post_id;
  const numPostId = +postId;

  const state = await postService.updatePostLikeByUser(userId, numPostId)
  res.status(200).json(state)
})



export default { 
  createPost,
  getAllPosts,
  getPostById,
  updatePostLikeByUser
}