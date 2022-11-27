import express from "express"
import userController from "../controllers/userController"

const router = express.Router()

router.post('/duplication', userController.userAvailableCheck)
router.post('/signup', userController.createUser)
router.post('/signin', userController.signInUser)
router.post('/kakaoLogin', userController.kakaoLogin)
router.post('/kakaoLogout', userController.kakaoLogout)


export default router