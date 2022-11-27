import express from "express"
import userRouter from "./usersRoute"
import postRouter from "./postsRoute"

const router = express.Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)

export default router