import axios, { AxiosResponse } from "axios";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userDao from "../models/userDao"
import { CreateUserDTO, UpdateUserDTO } from "../dto/userDto"
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


const createUser = async (userData: CreateUserDTO) => {
  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(userData.password, salt);
  userData.password = hashedPw;

  return await userDao.createUser(userData);
}


const signInUser = async (userData: CreateUserDTO) => {
  let token = ""

  const userIdPw = await userDao.getUserByAccount(userData);
  console.log(userIdPw)
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
  return axios({
      method: "POST",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${accessToken}`
      }
  })
}


const getMyPage = async (userId: number) => {
  return await userDao.getMyPage(userId)
}


const updateUserName = async (updateData: UpdateUserDTO) => {
  return await userDao.updateUserName(updateData)
}


const getMyPosts = async (userId: number) => {
  const posts = await userDao.getMyPosts(userId)
  posts.map((post) => {
    post.category = JSON.parse(post.category)
    if(post.count_comments !== null) post.count_comments = +post.count_comments
    if(post.count_likes !== null) post.count_likes = +post.count_likes
    if(post.is_liked !== null && post.is_liked !== undefined) post.is_liked = +post.is_liked
    if(post.is_marked !== null && post.is_marked !== undefined) post.is_marked = +post.is_marked
  })

  return posts;
}


const getMyBookmarks = async (userId: number) => {
  return await userDao.getMyBookmarks(userId)
}


const updateWithdrowUser = async (userId: number) => {
  return await userDao.updateWithdrowUser(userId)
}


export default { 
  userAvailableCheck,
  createUser,
  signInUser,
  kakaoLogin,
  kakaoLogout,
  getMyPage,
  getMyPosts,
  getMyBookmarks,
  updateUserName,
  updateWithdrowUser
}