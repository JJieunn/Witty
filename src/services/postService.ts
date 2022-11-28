import { PostDTO } from "../dto/postDto";
import postDao from "../models/postDao";



const createPost = async (userId: number, categoryId: number, postData: PostDTO) => {
  await postDao.createPost(userId, categoryId, postData);
}

const getAllPosts = async () => {
  return await postDao.getAllPosts();
}

const getPostById = async (postId: number) => {
  return await postDao.getPostById(postId)
}


export default { createPost, getAllPosts, getPostById }