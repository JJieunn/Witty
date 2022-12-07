import { CreatePostDTO, UpdatePostDTO } from "../dto/postDto";
import postBookmarks from "../models/postBookmarks";
import postDao from "../models/postDao";



const getCategoryId = async (category: string | undefined) => {
  let categoryId: number;

  switch (category) {
    case "오늘먹은것" : return categoryId = 1
    case "오늘기분" : return categoryId = 2
    case "오늘소비" : return categoryId = 3
    case "오늘잡담" : return categoryId = 4
    case "오늘아무거나" : return categoryId = 5
  }
}


const createPost = async (postData: CreatePostDTO) => {
  let categoryId: number | undefined;

  categoryId = await getCategoryId(postData.category);
  await postDao.createPost(categoryId, postData);
}


const getAllPosts = async (userId: number | null) => {
  return await postDao.getAllPosts(userId);
}


const getPostById = async (userId: number | null, postId: number) => {
  return await postDao.getPostById(userId, postId);
}


const updatePost = async (userId: number | null, postId: number, postData: UpdatePostDTO) => {
  let categoryId: number | undefined; 

  if(Object.keys(postData).includes("category")) { categoryId = await getCategoryId(postData.category) }
  if(Object.keys(postData).includes("images")) { await postDao.updatePostImages(postId, postData.images) }

  await postDao.updatePost(postId, categoryId, postData);
  return await postDao.getPostById(userId, postId);
}


const deletePost = async (postId: number) => {
  return await postDao.deletePost(postId);
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


const updatePostBookmark = async(userId: number, postId: number) => {
  const [isMarked] = await postBookmarks.getPostBookmarkByUserPostId(userId, postId);

  switch(isMarked.Exist) { 
    case "0" :
      await postBookmarks.insertPostBookmarks(userId, postId)
      const [case0] = await postBookmarks.getPostBookmark(userId, postId)
      case0.is_marked = +case0.is_marked;
      return case0;

    case "1" : 
      await postBookmarks.updatePostBookmark(userId, postId)
      const [case1] = await postBookmarks.getPostBookmark(userId, postId)
      case1.is_marked = +case1.is_marked;
      return case1;
    }
} 



export default { 
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  updatePostLikeByUser,
  updatePostBookmark
}