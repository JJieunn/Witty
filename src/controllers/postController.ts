import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import { PostDTO } from "../dto/postDto";
import postService from "../services/postService"



const createPost = asyncWrap (async (req: Request, res: Response) => {
  const postData: PostDTO = req.body;
  // 인가 추가

  await postService.createPost(postData);
  res.status(201).json({ message: "Post_Created" })
})

const getAllPosts = asyncWrap (async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts)
})


export default { createPost, getAllPosts }