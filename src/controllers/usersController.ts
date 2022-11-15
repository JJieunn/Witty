import { Request, Response } from "express"
import { asyncWrap } from "../common/asyncWrap"
import { keyError } from "../common/keyErrorCheck";
import { UserDTO } from "../dto/userDto"
import userService from "../services/userService"



const userAvailableCheck = asyncWrap (async (req: Request, res: Response) => {
  const userData: object = req.body;

  await userService.userAvailableCheck(userData);
  res.status(200).json({ message: "Available" });
});


const createUser = asyncWrap (async (req: Request, res: Response) => {
  const userData: UserDTO = req.body;
  keyError(userData);

  await userService.createUser(userData);
  res.status(201).json({ message: "User_Created" });
});




export default { userAvailableCheck, createUser }