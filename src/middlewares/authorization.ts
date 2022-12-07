import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { BadRequestExceptions, NotFoundError, UnauthorizedExecption } from "../common/createError";
import { getUserExistsById } from "../models/userDao"
import { SECRET_KEY } from "../configs/keyConfig"



const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.headers['authorization'];
    if (!access_token) throw new UnauthorizedExecption("Token_Not_Provided")

    const userId = jwt.verify(access_token, SECRET_KEY);
    const value = Object.values(userId)

    const [foundUser] = await getUserExistsById(value[0]);
    if(!+Object.values(foundUser)[0]) throw new NotFoundError("User_Not_Found");
    
    req.body.foundUser = value[0];
    next();

  } catch (error) {
    console.log(error)
    throw new BadRequestExceptions("Invalid_Token")
  }
};

// 애초에 로그인해야 서비스 이용이 가능하므로 함수 하나로 통일해도 될 듯. 또한 인증인가를 둘러싸는 asnycWrap도 고민할 것. 현재 400, 401 에러처리가 제대로 안됨
const validateTokenBycondition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.headers['authorization'];
    if(access_token) {
      const userId = jwt.verify(access_token, SECRET_KEY);
      const value = Object.values(userId)
      
      const [foundUser] = await getUserExistsById(value[0]);
      if(!+Object.values(foundUser)[0]) throw new NotFoundError("User_Not_Found");
      
      req.body.foundUser = value[0];
    } else if (!access_token) { req.body.foundUser = null; }

    next();

  } catch (error) {
    console.log(error)
    throw new BadRequestExceptions("Invalid_Token")
  }
};



export { validateToken, validateTokenBycondition };