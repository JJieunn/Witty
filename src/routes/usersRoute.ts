import express from "express"
import userController from "../controllers/usersController"

const router = express.Router()

router.post('/duplication', userController.userAvailableCheck)
router.post('/signup', userController.createUser)
router.post('/signin', userController.signInUser)
router.post('/kakaoLogin', userController.kakaoLogin)
router.post('/kakaoLogout', userController.kakaoLogout) // 굳이 카카오와 일반 로그아웃을 구별?


export default router