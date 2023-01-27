import { DuplicateError } from "../common/createError"
import { myDataSource } from "../configs/typeorm_config"
import { returnPostDTO } from "../dto/postDto"
import { CreateUserDTO, UpdateUserDTO } from "../dto/userDto"
import { Posts } from "../entities/post_entity"
import { Users } from "../entities/user_entity"




const getUserExists = async (selectQuery: string): Promise<any> => {
  const user = await myDataSource.query(`SELECT EXISTS (SELECT id FROM users WHERE ${selectQuery}) as Exist`)

  if(user[0].Exist === '1') { throw new DuplicateError("Duplicate_Error"); }
  else if(user[0].Exist === '0') return;
}


const getUserExistsById = async (userId: number): Promise<object[]> => {
  return await myDataSource.query(`SELECT EXISTS (SELECT id FROM users WHERE id = ?) as Exist`, [userId])
}


const createUser = async (userData: CreateUserDTO): Promise<object> => {
  return await myDataSource
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      account: userData.account,
      password: userData.password,
      nickname: userData.nickname,
      email: userData.email
    })
    .execute()
}


const getUserByAccount = async (userData: CreateUserDTO): Promise<any> => {
  const account = userData.account;

  return await myDataSource.query(`
    SELECT 
      id, password, nickname 
    FROM users 
    WHERE account = ?`, [account])
}


const createSNSUser = async (account: string, email: string, nickname: string): Promise<object> => {
  return await myDataSource
  .createQueryBuilder()
  .insert()
  .into(Users)
  .values({
    account,
    password: "",
    nickname,
    email
  })
  .execute()
}


const getSNSUser = async (account: string, email: string) => {
  return await myDataSource.query(`
  SELECT 
    id, email, nickname 
  FROM users 
  WHERE email = ? AND account = ?`, [email, account])
}


const getMyPage = async (userId: number) => {
  return await myDataSource.createQueryBuilder()
    .select(["id", "account", "nickname"])
    .from(Users, "users")
    .where("id = :userId", { userId })
    .getRawOne()
}


const updateUserName = async (updateData: UpdateUserDTO) => {
  return await myDataSource.createQueryBuilder()
    .update(Users)
    .set({
      nickname: updateData.nickname
    })
    .where("id = :userId", { userId: updateData.foundUser })
    .execute()
}


const getMyPosts = async (userId: number): Promise<returnPostDTO[]> => {
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
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `, [userId])
}


const getMyBookmarks = async (userId: number) => {
  return await myDataSource.query(`
  SELECT DISTINCT 
    bookmarks.id, bookmarks.post_id, p.content, p.category, 
    p.count_likes, p.count_comments, p.images
  FROM post_bookmarks bookmarks
  JOIN
    (	SELECT 
        posts.id, posts.content, posts.category_id as category,
        post_images.post_id as images, COUNT(post_likes.id) as count_likes, COUNT(comments.id) as count_comments
      FROM posts
      LEFT JOIN post_images ON posts.id = post_images.post_id
      LEFT JOIN post_likes ON posts.id = post_likes.post_id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id
    ) p ON bookmarks.post_id = p.id
  WHERE is_marked = 1 AND bookmarks.user_id = ?`, [userId])
}


const updateMyBookmarks = async (userId: number, postId: number) => {
  await myDataSource.query(`
  UPDATE post_bookmarks
  SET is_marked = 0
  WHERE user_id = ? AND post_id = ?
`, [userId, postId])

  return await myDataSource.query(`
  SELECT DISTINCT 
    bookmarks.id, bookmarks.post_id, p.content, p.category, 
    p.count_likes, p.count_comments, p.images
  FROM post_bookmarks bookmarks
  JOIN
    (	SELECT 
        posts.id, posts.content, posts.category_id as category,
        post_images.post_id as images, COUNT(post_likes.id) as count_likes, COUNT(comments.id) as count_comments
      FROM posts
      LEFT JOIN post_images ON posts.id = post_images.post_id
      LEFT JOIN post_likes ON posts.id = post_likes.post_id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id
    ) p ON bookmarks.post_id = p.id
  WHERE is_marked = 1 AND bookmarks.user_id = ?`, [userId])
}


const withdrowUser = async (userId: number) => {
  return await myDataSource.createQueryBuilder()
    .delete()
    .from(Users)
    .where("id = :userId", { userId })
    .execute()
}



export { getUserExistsById }

export default { 
  getUserExists,
  createUser,
  getUserByAccount,
  createSNSUser,
  getSNSUser,
  getMyPage,
  getMyPosts,
  getMyBookmarks,
  updateMyBookmarks,
  updateUserName,
  withdrowUser
}
