import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap";
import { PostDTO } from "../dto/postDto";
import postService from "../services/postService"



const createPost = asyncWrap (async (req: Request, res: Response) => {
  const postData: PostDTO = req.body;
  // 인가 추가
  let userId = "1";
  let numUserId = +userId
  let category_id = 1;

  await postService.createPost(numUserId, category_id, postData);
  res.status(201).json({ message: "Post_Created" })
})

const getAllPosts = asyncWrap (async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts)
})

const getPostById = asyncWrap (async (req: Request, res: Response) => {
  let postId = req.params.post_id;
  let numPostId = +postId;

  const post = await postService.getPostById(numPostId);
  res.status(200).json(post)
})



export default { createPost, getAllPosts, getPostById }