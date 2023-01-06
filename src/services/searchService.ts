import searchDao from "../models/searchDao";
import { searchDTO } from "../dto/searchDto";
import { returnPostDTO } from "../dto/postDto";




const getCategoryById = (categoryId: string | number | undefined) => {
  let category: string;
  
  switch (categoryId) {
    case "1" : return category = "오늘먹은것"
    case "2" : return category = "오늘기분"
    case "3" : return category = "오늘소비"
    case "4" : return category = "오늘잡담"
    case "5" : return category = "오늘아무거나"
  }
}


const getPostByKeyword = async(userId: number | null, keyword: searchDTO, offset: any) => {
  const posts = await searchDao.getPostByKeyword(userId, keyword, offset);
  
  posts.map((post) => {
    if(userId !== null) {
      if(post.user_id === userId) { post.is_owner = true }
      else if(post.user_id !== userId) { post.is_owner = false }

      if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
      if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked
    }

    post.category = JSON.parse(post.category)
    if(post.count_comments !== null) post.count_comments = +post.count_comments
    if(post.count_likes !== null) post.count_likes = +post.count_likes
  })

  return posts;
}


const getUserByKeyword = async(keyword: searchDTO, offset: any) => {
  return await searchDao.getUserByKeyword(keyword, offset);
}


const getCategoryByKeyword = async(userId: number | null, keyword: searchDTO, offset: any) => {
  const posts = await searchDao.getCategoryByKeyword(userId, keyword, offset);
  
  posts.map((post) => {
    if(userId !== null) {
      if(post.user_id === userId) { post.is_owner = true }
      else if(post.user_id !== userId) { post.is_owner = false }

      if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
      if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked
    }

    post.category = JSON.parse(post.category)
    if(post.count_comments !== null) post.count_comments = +post.count_comments
    if(post.count_likes !== null) post.count_likes = +post.count_likes
  })

  return posts;
}


const getPostByCategory = async(userId: number | null, keyword: searchDTO, offset: any) => {
  let categoryArr: string[] = [];

  JSON.stringify(keyword.category).split('"').map((el) => {
    const category = getCategoryById(el)
    if(category !== undefined) { 
      categoryArr.push(category)
    }
  })
  const posts = await searchDao.getPostByCategory(userId, categoryArr, offset)
  
  posts.map((post) => {
    if(userId !== null) {
      if(post.user_id === userId) { post.is_owner = true }
      else if(post.user_id !== userId) { post.is_owner = false }

      if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
      if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked
    }

    post.category = JSON.parse(post.category)
    if(post.count_comments !== null) post.count_comments = +post.count_comments
    if(post.count_likes !== null) post.count_likes = +post.count_likes
  })

  return posts;
}




export default {
  getPostByKeyword,
  getUserByKeyword,
  getCategoryByKeyword,
  getPostByCategory
}