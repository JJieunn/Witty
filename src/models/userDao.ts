import { DuplicateError } from "../common/createError"
import { myDataSource } from "../configs/typeorm_config"
import { UserDTO } from "../dto/userDto"
import { Users } from "../entities/user_entity"




const getUserExists = async (selectQuery: string): Promise<any> => {
  const user = await myDataSource.query(`SELECT EXISTS (SELECT id FROM users WHERE ${selectQuery}) as Exist`)

  if(user[0].Exist === '1') { throw new DuplicateError("Duplicate_Error"); }
  else if(user[0].Exist === '0') return;
}


const createUser = async (userData: UserDTO): Promise<object> => {
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


const getUserByAccount = async (selectQuery: string): Promise<any> => {
  return await myDataSource.query(`
    SELECT 
      id, password, nickname 
    FROM users 
    WHERE ${selectQuery}`)
}




export default { getUserExists, createUser, getUserByAccount }
