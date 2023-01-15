import { CreatePostDTO, UpdatePostDTO, postDTO } from "../dto/postDto";
import likeAndBookmarkDao from "../models/likeAndBookmarkDao";
import postDao from "../models/postDao";




const createPost = async (postData: CreatePostDTO) => {
  await postDao.createPost(JSON.stringify(postData.category), postData);
  
  if(postData.images !== undefined) {
    postData.images.map( async (image) => {
      await postDao.createPostImages(postData.foundUser, image)
    })
  }
}


const getAllPosts = async (userId: number | null, offset: any) => {
  const posts = await postDao.getAllPosts(userId, offset);
  
  posts.map((post) => {
    if(userId !== null) {
      if(post.user_id === userId) { post.is_owner = true }
      else if(post.user_id !== userId) { post.is_owner = false }

      if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
      if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked
    }

    post.category = JSON.parse(post.category)
    if(post.count_comments !== null && post.count_comments !== undefined) post.count_comments = +post.count_comments
    if(post.count_likes !== null && post.count_likes !== undefined) post.count_likes = +post.count_likes
  })

  return posts;
}


const getPostById = async (userId: number | null, postId: number) => {
  const [post] = await postDao.getPostById(userId, postId);
  const [commentList] = await postDao.getCommentsByPost(userId, postId);
  let result: postDTO = {
    post
  }
  
  if(userId !== null) {
    if(post.user_id === userId) { post.is_owner = true }
    else if (post.user_id !== userId) { post.is_owner = false }
  }
  
  post.category = JSON.parse(post.category)
  if(post.count_comments !== null && post.count_comments !== undefined) post.count_comments = +post.count_comments
  if(post.count_likes !== null && post.count_likes !== undefined) post.count_likes = +post.count_likes
  if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
  if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked

  if(commentList !== undefined) {
    if(userId !== null && commentList.comments.length !== 0) {
      commentList.comments.map((comment) => {
        if(comment.user_id === userId) { comment.is_owner = true }
        else if(comment.user_id !== userId) { comment.is_owner = false }

        if(comment.is_liked !== null && comment.is_liked !== undefined) { comment.is_liked = +comment.is_liked }
      })
    }

    result.comments = commentList.comments;
  } 
  else if(commentList === undefined) result.comments = [];

  result.post = post;
  return result;
}


const getDatasBeforeUpdatePost = async (postId: number) => {
  const [post] = await postDao.getDatasByPostId(postId)
  let result: postDTO = {
    post
  }

  return result;
}


const updatePost = async (postId: number, postData: UpdatePostDTO) => {

  if(postData.images !== undefined) {
    await postDao.deletePostImages(postId)
    postData.images.map( async (image) => {
      await postDao.updatePostImages(postId, image)
    })
  }

  return await postDao.updatePost(postId, JSON.stringify(postData.category), postData);
}


const deletePost = async (userId: number | null, postId: number) => {
  return await postDao.deletePost(userId, postId);
}


const updatePostLikeByUser = async(userId: number, postId: number) => {
  const [isLiked] = await likeAndBookmarkDao.isPostLikeExistedInEntity(userId, postId);
  
  switch (isLiked.Exist) {
    case "0" :
      await likeAndBookmarkDao.insertPostLike(userId, postId)
      const [case0] = await likeAndBookmarkDao.getPostLike(userId, postId)
      case0.count_likes = +case0.count_likes;
      return case0;
    
    case "1" :
      await likeAndBookmarkDao.updatePostLikeByUser(userId, postId)
      const [case1] = await likeAndBookmarkDao.getPostLike(userId, postId)
      case1.count_likes = +case1.count_likes;
      if(case1.count_likes === null) { case1.count_likes = 0 }
      return case1;
  }
}


const updatePostBookmark = async(userId: number, postId: number) => {
  const [isMarked] = await likeAndBookmarkDao.isBookmarkExistedInEntity(userId, postId);

  switch(isMarked.Exist) { 
    case "0" :
      await likeAndBookmarkDao.insertPostBookmarks(userId, postId)
      return await likeAndBookmarkDao.getPostBookmark(userId, postId)

    case "1" : 
      await likeAndBookmarkDao.updatePostBookmark(userId, postId)
      return await likeAndBookmarkDao.getPostBookmark(userId, postId)
    }
} 



export default { 
  createPost,
  getAllPosts,
  getPostById,
  getDatasBeforeUpdatePost,
  updatePost,
  deletePost,
  updatePostLikeByUser,
  updatePostBookmark
}