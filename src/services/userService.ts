import axios, { AxiosResponse } from "axios";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userDao from "../models/userDao"
import { UserDTO } from "../dto/userDto"
import { BadRequestExceptions, keyError, PwMismatchError } from "../common/createError"
import { SECRET_KEY, JavaScript_Key, REDIRECT_URI } from "../configs/keyConfig"


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
  else if (isPasswordCorrected) { token = jwt.sign({ id: userIdPw[0].id }, SECRET_KEY, { expiresIn: '2h' }); }
  
  const user = {
    nickname: userIdPw[0].nickname,
    token
  }

  return user;
}


// kakao
let accessToken: AxiosResponse<any, any>;

const getTokenByAuthorizeCode = async (authorizeCode: any) => {
  return axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    params: {
      "grant_type": "authorization_code",
      "client_id": JavaScript_Key,
      "redirect_uri": REDIRECT_URI,
      "code": authorizeCode.authorizationCode
    }
  })
}

const getUserInfoByKakaoToken = (kakaoToken: string) => {
  return axios({
    method: "GET",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: `Bearer ${kakaoToken}`
    }
  })
}

const kakaoLogin = async (authorizeCode: any) => {
  const kakaoToken = await getTokenByAuthorizeCode(authorizeCode); // object type
  
  // if(kakaoToken.status === 400) { throw new BadRequestExceptions("Bad Request") }
  const userInfo = await getUserInfoByKakaoToken(kakaoToken.data.access_token); // object type
  
  const account = "KAKAO";
  const foundUser = await userDao.getSNSUser(account, userInfo.data.kakao_account.email);

  
  if(foundUser.length === 0) { 
    await userDao.createSNSUser(
      account,
      userInfo.data.kakao_account.email,
      userInfo.data.kakao_account.profile.nickname
  ); }

  const user = await userDao.getSNSUser(account, userInfo.data.kakao_account.email);
  const token = jwt.sign({ id: user[0].id }, SECRET_KEY, { expiresIn: '2h' });
  
  const result = {
    nickname: userInfo.data.kakao_account.profile.nickname,
    token
  }

  accessToken = kakaoToken;
  return result;
}


const kakaoLogout = () => {
  console.log(accessToken)
  return axios({
      method: "POST",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${accessToken}`
      }
  })
}



export default { 
  userAvailableCheck,
  createUser,
  signInUser,
  kakaoLogin,
  kakaoLogout
}