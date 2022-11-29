import { DuplicateError } from "../common/createError"
import { myDataSource } from "../configs/typeorm_config"
import { UserDTO } from "../dto/userDto"
import { Users } from "../entities/user_entity"




const getUserExists = async (selectQuery: string): Promise<any> => {
  const user = await myDataSource.query(`SELECT EXISTS (SELECT id FROM users WHERE ${selectQuery}) as Exist`)

  if(user[0].Exist === '1') { throw new DuplicateError("Duplicate_Error"); }
  else if(user[0].Exist === '0') return;
}


const getUserById = async (query: string): Promise<any> => {
  return await myDataSource.query(`SELECT EXISTS (SELECT id FROM users WHERE ${query}) as Exist`)
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


const getUserByAccount = async (userData: UserDTO): Promise<any> => {
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


const getSNSUser = async (account: string, email: string) => {// 인자로 email 올 수 있는 거 맞아?
  return await myDataSource.query(`
  SELECT 
    id, email, nickname 
  FROM users 
  WHERE email = ? AND account = ?`, [email, account]) // DB명 변경 주의
}



export {getUserById}

export default { 
  getUserExists,
  createUser,
  getUserByAccount,
  createSNSUser,
  getSNSUser
}
