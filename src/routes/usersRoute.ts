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
router.delete('/my', validateToken, userController.withdrowUser)
router.get('/my/posts', validateToken, userController.getMyPosts)
router.get('/my/bookmarks', validateToken, userController.getMyBookmarks)
router.patch('/my/bookmarks/:post_id', validateToken, userController.updateMyBookmarks)


export default router