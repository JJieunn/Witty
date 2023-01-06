import { myDataSource } from "../configs/typeorm_config"
import { searchDTO } from "../dto/searchDto"
import { returnPostDTO } from "../dto/postDto"




const getPostByKeyword = async(userId: number | null, keyword: searchDTO, offset: any): Promise<returnPostDTO[]> => {
  let likeAndBookmark = ""
  let leftJoinWithLikes = ""
  let leftJoinWithBookmarks = ""

  if(userId != null) {
    likeAndBookmark = `, likes.is_liked as is_liked, bookmarks.is_marked as is_marked`
    leftJoinWithLikes = `LEFT JOIN (SELECT post_id, is_liked FROM post_likes WHERE user_id = ${userId}) likes ON p.id = likes.post_id`
    leftJoinWithBookmarks = `LEFT JOIN (SELECT post_id, is_marked FROM post_bookmarks WHERE user_id = ${userId}) bookmarks ON p.id = bookmarks.post_id`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, p.category_id as category,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${likeAndBookmark}, pi.images
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ${leftJoinWithLikes}
    ${leftJoinWithBookmarks}
    LEFT JOIN (SELECT post_id, JSON_ARRAYAGG(image_url) as images FROM post_images GROUP BY post_id) pi ON p.id = pi.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    WHERE content REGEXP ?
    ORDER BY p.created_at DESC
    LIMIT ?, 12
  `, [keyword.q, +offset * 12])
}


const getUserByKeyword = async(keyword: searchDTO, offset: any) => {
  return await myDataSource.query(`
    SELECT
      id, nickname, account
    FROM users
    WHERE nickname REGEXP ?
    LIMIT ?, 12
  `, [keyword.q, +offset * 12])
}


const getCategoryByKeyword = async(userId: number | null, keyword: searchDTO, offset: any): Promise<returnPostDTO[]> => {
  let likeAndBookmark = ""
  let leftJoinWithLikes = ""
  let leftJoinWithBookmarks = ""

  if(userId != null) {
    likeAndBookmark = `, likes.is_liked as is_liked, bookmarks.is_marked as is_marked`
    leftJoinWithLikes = `LEFT JOIN (SELECT post_id, is_liked FROM post_likes WHERE user_id = ${userId}) likes ON p.id = likes.post_id`
    leftJoinWithBookmarks = `LEFT JOIN (SELECT post_id, is_marked FROM post_bookmarks WHERE user_id = ${userId}) bookmarks ON p.id = bookmarks.post_id`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, p.category_id as category,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${likeAndBookmark}, pi.images
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ${leftJoinWithLikes}
    ${leftJoinWithBookmarks}
    LEFT JOIN (SELECT post_id, JSON_ARRAYAGG(image_url) as images FROM post_images GROUP BY post_id) pi ON p.id = pi.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    WHERE category_id REGEXP ?
    ORDER BY p.created_at DESC
    LIMIT ?, 12
  `, [keyword.q, +offset * 12])
}


const getPostByCategory = async(userId: number | null, category: string[], offset: any): Promise<returnPostDTO[]> => {
  let searchQuery = ""

  if(category.length !== 0) {
    category.map((el, i) => {
        if(i > 0) { searchQuery += " OR " }
        
        searchQuery += `category_id LIKE '%${el}%'`
    })
  }

  let likeAndBookmark = ""
  let leftJoinWithLikes = ""
  let leftJoinWithBookmarks = ""

  if(userId != null) {
    likeAndBookmark = `, likes.is_liked as is_liked, bookmarks.is_marked as is_marked`
    leftJoinWithLikes = `LEFT JOIN (SELECT post_id, is_liked FROM post_likes WHERE user_id = ${userId}) likes ON p.id = likes.post_id`
    leftJoinWithBookmarks = `LEFT JOIN (SELECT post_id, is_marked FROM post_bookmarks WHERE user_id = ${userId}) bookmarks ON p.id = bookmarks.post_id`
  }

  return await myDataSource.query(`
    SELECT 
      p.id, u.nickname, p.user_id, p.category_id as category,
      p.content, p.created_at, c.count_comments, pl.count_likes
      ${likeAndBookmark}, pi.images
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ${leftJoinWithLikes}
    ${leftJoinWithBookmarks}
    LEFT JOIN (SELECT post_id, JSON_ARRAYAGG(image_url) as images FROM post_images GROUP BY post_id) pi ON p.id = pi.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_comments FROM comments GROUP BY post_id) c ON p.id = c.post_id
    LEFT JOIN (SELECT post_id, COUNT(id) as count_likes FROM post_likes WHERE is_liked = 1 GROUP BY post_id) pl ON p.id = pl.post_id 
    WHERE ${searchQuery}
    ORDER BY p.created_at DESC
    LIMIT ?, 12
  `,[+offset * 12])  
}





export default { 
  getPostByKeyword,
  getUserByKeyword,
  getCategoryByKeyword,
  getPostByCategory
}