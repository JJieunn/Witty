import bcrypt from "bcryptjs"
import userDao from "../models/userDao"
import { UserDTO } from "../dto/userDto"
import { NotFoundError } from "../common/createError"



const userAvailableCheck = async (userData: object) => {
  const value = Object.values(userData)
  let query = `account = "${value}"`
  
  if(!(Object.keys(userData).includes("eamil") && Object.keys(userData).includes("account")))
  { throw new NotFoundError("Not_Found_Key"); }

  if(Object.keys(userData).includes("email")) query = `email = "${value}"`
  await userDao.getUserExists(query);
}


const createUser = async (userData: UserDTO) => {
  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(userData.password, salt);
  userData.password = hashedPw;

  return await userDao.createUser(userData);
}



export default { userAvailableCheck, createUser }