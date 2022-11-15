import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userDao from "../models/userDao"
import { UserDTO } from "../dto/userDto"
import { NotFoundError, PwMismatchError } from "../common/createError"
import { SECRET_KEY } from "../configs/keyConfig"


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


const signInUser = async (userData: UserDTO) => {
  let token = ""
  const user = {
    nickname: "",
    token: ""
  }
  const query = `account = "${userData.account}"`

  const userIdPw = await userDao.getUserByAccount(query);
  const isPasswordCorrected = bcrypt.compareSync(userData.password, userIdPw[0].password);

  if (!isPasswordCorrected) { throw new PwMismatchError("Password_Mismatch") }
  else if (isPasswordCorrected) { token = jwt.sign({ account: userIdPw[0].account }, SECRET_KEY, { expiresIn: '2h' }); }
  
  user.nickname = userIdPw[0].nickname;
  user.token = token;

  return user;
}



export default { userAvailableCheck, createUser, signInUser }