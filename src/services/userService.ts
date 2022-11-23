import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userDao from "../models/userDao"
import { UserDTO } from "../dto/userDto"
import { keyError, PwMismatchError } from "../common/createError"
import { SECRET_KEY } from "../configs/keyConfig"


const userAvailableCheck = async (userData: object) => {
  const value = Object.values(userData)
  const key = Object.keys(userData)
  let query = `${key} = "${value}"`

  if(!Object.keys(userData).includes("account") && !Object.keys(userData).includes("email")) 
  { throw new keyError("Key_Error"); }
  
  await userDao.getUserExists(query);
}


const createUser = async (userData: UserDTO) => {
  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(userData.password, salt);
  userData.password = hashedPw;

  return await userDao.createUser(userData);
}


const signInUser = async (userData: UserDTO) => {
  let token = ""

  const userIdPw = await userDao.getUserByAccount(userData);
  const isPasswordCorrected = bcrypt.compareSync(userData.password, userIdPw[0].password);

  if (!isPasswordCorrected) { throw new PwMismatchError("Password_Mismatch") }
  else if (isPasswordCorrected) { token = jwt.sign({ account: userIdPw[0].account }, SECRET_KEY, { expiresIn: '2h' }); }
  
  const user = {
    nickname: userIdPw[0].nickname,
    token: token
  }

  return user;
}



export default { userAvailableCheck, createUser, signInUser }