import { myDataSource } from "../configs/typeorm_config";
import { PostDTO } from "../dto/postDto";
import { Posts } from "../entities/post_entity";



const createPost = async (postData: PostDTO): Promise<void> => {
  await myDataSource.createQueryBuilder()
  .insert()
  .into(Posts)
  .values({
    // user_id,
    content: postData.content
  })
  .execute()
}

const getAllPosts = async (): Promise<any> => {
  return await myDataSource.query(`
    SELECT 
      id, user_id, content, created_at
    FROM posts 
    ORDER BY DESC `)
}


export default { createPost, getAllPosts }