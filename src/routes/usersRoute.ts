import express from "express"
import userController from "../controllers/userController"
import { validateToken } from "../middlewares/authorization"

const router = express.Router()

router.post('/duplication', userController.userAvailableCheck)
router.post('/signup', userController.createUser)
router.post('/signin', userController.signInUser)
router.post('/kakaoLogin', userController.kakaoLogin)
router.post('/kakaoLogout', userController.kakaoLogout)
router.get('/my', validateToken, userController.getMyPage)
router.patch('/my/name', validateToken, userController.updateUserName)
router.patch('/my', validateToken, userController.updateWithdrowUser) // 임시
router.get('/my/posts', validateToken, userController.getMyPosts)
router.get('/my/bookmarks', validateToken, userController.getMyBookmarks)


export default router