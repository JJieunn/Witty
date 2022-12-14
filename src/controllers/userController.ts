import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap"
import { keyError } from "../common/keyErrorCheck";
import { CreateUserDTO, UpdateUserDTO } from "../dto/userDto"
import userService from "../services/userService"
import { BadRequestExceptions } from "../common/createError"



const userAvailableCheck = asyncWrap (async (req: Request, res: Response) => {
  const userData: object = req.body;

  await userService.userAvailableCheck(userData);
  res.status(200).json({ message: "Available" });
});


const createUser = asyncWrap (async (req: Request, res: Response) => {
  const userData: CreateUserDTO = req.body;
  keyError(userData);

  await userService.createUser(userData);
  res.status(201).json({ message: "User_Created" });
});


const signInUser = asyncWrap (async (req: Request, res: Response) => {
  const userData: CreateUserDTO = req.body;

  const result = await userService.signInUser(userData);
  res.status(200).json({ message: "Login_Success", result });
});


const kakaoLogin = asyncWrap (async (req: Request, res: Response) => {
  const authorizeCode = req.body;

  if(!authorizeCode) { throw new BadRequestExceptions("Require_Kakao_Login"); }

  const userInfo = await userService.kakaoLogin(authorizeCode);
  res.status(200).json(userInfo)
});


const kakaoLogout = asyncWrap (async (req: Request, res: Response) => {
  const result = await userService.kakaoLogout();
  if(result.status === 200) res.status(200).json({ message: "Logout_Success" })
})


const getMyPage = asyncWrap (async (req: Request, res: Response) => {
  const userId: number = req.body.foundUser;
  
  const myPage = await userService.getMyPage(userId)
  res.status(200).json(myPage)
})


const updateUserName = asyncWrap (async (req: Request, res: Response) => {
  const updateData: UpdateUserDTO = req.body;

  await userService.updateUserName(updateData)
  res.status(200).json({ message: "Nickname_Updated" })
})


const getMyPosts = asyncWrap (async (req: Request, res: Response) => {
  const userId: number = req.body.foundUser;

  const posts = await userService.getMyPosts(userId)
  res.status(200).json(posts)
})


const getMyBookmarks = asyncWrap (async (req: Request, res: Response) => {
  const userId: number = req.body.foundUser;

  const bookmarks = await userService.getMyBookmarks(userId)
  res.status(200).json(bookmarks)
})


// ??????????????? ????????? ?????? ????????? ?????? ????????? ????????? ???????????? > ?????? ???????????? ??????? ????????? ????????? ??? ??????, ??????????????? ?????? ???????????? account??? alert?
// ?????? ?????? ????????? ???????????? ??????? ???????????? onDelele ????????? ???????????? ????????????... ?????? deletePost API??? ??????????????? ???????????? onDelete ?????????...
const withdrowUser = asyncWrap (async (req: Request, res: Response) => {
  const userId: number = req.body.foundUser;

  await userService.withdrowUser(userId)
  res.status(200).json({ messge: "Withdrow_Success" })
})



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
  withdrowUser
}