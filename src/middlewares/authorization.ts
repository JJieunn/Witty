import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { BadRequestExceptions, NotFoundError, UnauthorizedExecption } from "../common/createError";
import { getUserById } from "../models/userDao"
import { SECRET_KEY } from "../configs/keyConfig"

const validateToken = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.headers['authorization'];
    if (!access_token) throw new UnauthorizedExecption("Token_Not_Provided")

    const userId = jwt.verify(access_token, SECRET_KEY);
    const value = Object.values(userId)
    let query = `id = ${value[0]}`

    const [foundUser] = await getUserById(query);
    if(!foundUser) throw new NotFoundError("User_Not_Found");

    //request에 user_id 추가해주는 코드 필요
    
    next();

  } catch (error) {
    console.log(error)
    throw new BadRequestExceptions("Invalid_Token")
  }
});


export { validateToken };