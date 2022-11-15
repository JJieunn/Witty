import express from "express"
import userController from "../controllers/usersController"

const router = express.Router()

router.post('/duplication', userController.userAvailableCheck)
router.post('/signup', userController.createUser)
router.post('/signin', userController.signInUser)

export default router