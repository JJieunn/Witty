import { PostDTO } from "../dto/postDto";
import postDao from "../models/postDao";



const createPost = async (postData: PostDTO) => {
  await postDao.createPost(postData);
}

const getAllPosts = async () => {
  return  postDao.getAllPosts();
}


export default { createPost, getAllPosts }