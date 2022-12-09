import express from "express"
import userRouter from "./usersRoute"
import postRouter from "./postsRoute"
import commentRouter from "./commentsRoute"

const router = express.Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)

export default router