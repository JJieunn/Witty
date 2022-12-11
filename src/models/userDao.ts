import { DuplicateError } from "../common/createError"
import { myDataSource } from "../configs/typeorm_config"
import { CreateUserDTO, UpdateUserDTO } from "../dto/userDto"
import { Categories } from "../entities/category_entity"
import { Post_bookmarks } from "../entities/post_bookmarks_entity"
import { Posts } from "../entities/post_entity"
import { Post_images } from "../entities/post_images_entity"
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


const getMyPosts = async (userId: number) => {
  return await myDataSource.getRepository(Posts)
    .createQueryBuilder("posts")
    .select(["posts.id AS id", "posts.content AS content", "posts.created_at AS created_at",
        "post_images.post_id AS images",
        "category.id AS category_id", "category.name AS category"])
    .addSelect("COUNT(comments.id) AS count_comments")
    .addSelect("COUNT(post_likes.id) AS count_likes")
    .innerJoin("posts.category", "category")
    .leftJoin("posts.comments", "comments")
    .leftJoin("posts.post_likes", "post_likes")
    .leftJoin("posts.post_images", "post_images")
    .where("posts.user_id = :userId", { userId })
    .groupBy("posts.id")
    .orderBy("posts.created_at", "DESC")
    .getRawMany()
}


const getMyBookmarks = async (userId: number) => {
  return await myDataSource.query(`
  SELECT DISTINCT 
    bookmarks.id, bookmarks.post_id, p.content, p.category_id as category_id, p.category as category, 
    p.count_likes, p.count_comments, p.images
  FROM post_bookmarks bookmarks
  JOIN
    (	SELECT 
        posts.id, posts.content, categories.id as category_id, categories.name as category,
        post_images.post_id as images, COUNT(post_likes.id) as count_likes, COUNT(comments.id) as count_comments
      FROM posts
      JOIN categories ON posts.category_id = categories.id
      LEFT JOIN post_images ON posts.id = post_images.post_id
      LEFT JOIN post_likes ON posts.id = post_likes.post_id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id
    ) p ON bookmarks.post_id = p.id
  WHERE is_marked = 1 AND bookmarks.user_id = ?`, [userId])
}


const updateWithdrowUser = async (userId: number) => {
  return await myDataSource.createQueryBuilder()
    .update(Users)
    .set({
      account: "",
      email: "",
      nickname: "유령회원"
    })
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
  updateUserName,
  updateWithdrowUser
}
