import { PostDTO } from "../dto/postDto";
import postDao from "../models/postDao";



const createPost = async (categoryId: number, postData: PostDTO) => {
  await postDao.createPost(categoryId, postData);
}

const getAllPosts = async (userId: number | null) => {
  return await postDao.getAllPosts(userId);
}

const getPostById = async (userId: number | null, postId: number) => {
  return await postDao.getPostById(userId, postId)
}

const updatePostLikeByUser = async(userId: number, postId: number) => {
  const [isLiked] = await postDao.getPostLikesByUserPostId(userId, postId);
  
  if(isLiked.Exist === "0") { 
    await postDao.insertPostLikes(userId, postId)
    return await postDao.getPostLike(userId, postId) }

  else if(isLiked.Exist === "1") { 
    await postDao.updatePostLikeByUser(userId, postId)
    return await postDao.getPostLike(userId, postId) }
}


export default { 
  createPost,
  getAllPosts,
  getPostById,
  updatePostLikeByUser
}