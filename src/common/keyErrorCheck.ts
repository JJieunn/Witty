import { UserDTO } from "../dto/userDto"
import { RegExpError } from "./createError"

export const keyError = (userData: UserDTO) => {
  const passwordRegex = /^[A-Za-z0-9#?!@$%^&*\-]{8,16}$/g
  const nicknameRegex = /[a-zA-z0-9.\-_!?^()/]{1,6}/g
  
  const passwordKey = passwordRegex.test(userData.password)
  const nicknameKey = nicknameRegex.test(userData.nickname)
  
  if(passwordKey && nicknameKey) return;
  else throw new RegExpError("RegExp_Error")
}