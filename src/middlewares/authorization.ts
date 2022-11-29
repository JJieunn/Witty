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



export { validateToken };