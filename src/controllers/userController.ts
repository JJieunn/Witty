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


const updateMyBookmarks = asyncWrap (async (req: Request, res: Response) => {
  const userId: number = req.body.foundUser;
  const postId = +req.params.post_id;

  const bookmarks = await userService.updateMyBookmarks(userId, postId)
  res.status(200).json(bookmarks)
})

// 비식별화된 유저에 대해 로그인 등의 접근을 어떻게 막을건가 > 별도 테이블에 구성? 아니면 로그인 시 체크, 유령회원일 경우 사용불가 account로 alert?
// 일정 시간 지나면 자동으로 삭제? 그렇다면 onDelele 옵션을 조건따라 적용해야... 직접 deletePost API로 요청들어온 경우에만 onDelete 되도록...
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
  updateMyBookmarks,
  getMyBookmarks,
  updateUserName,
  withdrowUser
}