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


const getAllPosts = async (userId: number | null, offset: any, limit: any) => {
  const posts = await postDao.getAllPosts(userId, offset, limit);

  if(userId !== null) {
    posts.map((post) => {
      if(post.user_id === userId) { post.is_owner = true }
      else if(post.user_id !== userId) { post.is_owner = false }
    })
  }

  return posts;
}


const getPostById = async (userId: number | null, postId: number) => {
  const post = await postDao.getPostById(userId, postId);

  if(userId !== null) {
    if(post[0].user_id === userId) { post[0].is_owner = true }
    else if (post[0].user_id !== userId) { post[0].is_owner = false }
  }
  return post;
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
  
  switch (isLiked.Exist) {
    case "0" :
      await postDao.insertPostLikes(userId, postId)
      const [case0] = await postDao.getPostLike(userId, postId)
      case0.is_liked = +case0.is_liked;
      return case0;
    
    case "1" :
      await postDao.updatePostLikeByUser(userId, postId)
      const [case1] = await postDao.getPostLike(userId, postId)
      case1.is_liked = +case1.is_liked;

      if(case1.count_likes === null) { case1.count_likes = "0" }
      return case1;
  }
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