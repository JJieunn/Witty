import { CreatePostDTO, UpdatePostDTO } from "../dto/postDto";
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


const getAllPosts = async (userId: number | null, offset: any, limit: any) => {
  const posts = await postDao.getAllPosts(userId, offset, limit);

  posts.map((post) => {
    if(userId !== null) {
      if(post.user_id === userId) { post.is_owner = true }
      else if(post.user_id !== userId) { post.is_owner = false }

      if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
      if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked
    }

    post.category_id = JSON.parse(post.category_id)
    if(post.count_comments !== null) post.count_comments = +post.count_comments
    if(post.count_likes !== null) post.count_likes = +post.count_likes
  })

  return posts;
}


const getPostById = async (userId: number | null, postId: number) => {
  const post = await postDao.getPostById(userId, postId);

  if(userId !== null) {
    if(post[0].user_id === userId) { post[0].is_owner = true }
    else if (post[0].user_id !== userId) { post[0].is_owner = false }
  }

  if(userId !== null && post[0].comments !== null) {
    post[0].comments.map((comment) => {
      if(comment.user_id === userId) { comment.is_owner = true }
      else if (comment.user_id !== userId) { comment.is_owner = false }
    })
  }

  post[0].category_id = JSON.parse(post[0].category_id)
  if(post[0].count_comments !== null) post[0].count_comments = +post[0].count_comments
  if(post[0].count_likes !== null) post[0].count_likes = +post[0].count_likes
  if(post[0].is_liked !== null && post[0].is_liked !== undefined) post[0].is_liked = +post[0].is_liked
  if(post[0].is_marked !== null && post[0].is_marked !== undefined) post[0].is_marked = +post[0].is_marked

  return post;
}


const updatePost = async (postId: number, postData: UpdatePostDTO) => {

  if(postData.images !== undefined) {
    postData.images.map( async (image) => {
      await postDao.updatePostImages(postId, image)
    })
  }

// 수정된 이미지 업로드 추가

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
  updatePost,
  deletePost,
  updatePostLikeByUser,
  updatePostBookmark
}