import { CreateUserDTO } from "../dto/userDto"
import { RegExpError } from "./createError"

export const keyError = (userData: CreateUserDTO) => {
  const accountRegex = /^[\da-zA-Z]{6,15}$/g
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#*!^])[\da-zA-Z@#*!^]{8,16}$/g
  const nicknameRegex = /^[a-zA-z0-9.\-_!?^()/@#*!^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,8}$/g
  
  const accountKey = accountRegex.test(userData.account)
  const passwordKey = passwordRegex.test(userData.password)
  const nicknameKey = nicknameRegex.test(userData.nickname)
  
  if(passwordKey && nicknameKey && accountKey) return;
  else throw new RegExpError("RegExp_Error")
}