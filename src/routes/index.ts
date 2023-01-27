import express from "express"
import userRouter from "./usersRoute"
import postRouter from "./postsRoute"
import commentRouter from "./commentsRoute"
import searchRouter from "./searchRoute"
import swaggerUi from "swagger-ui-express"
import { specs } from "../../modules/swagger"

const router = express.Router()

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/search', searchRouter)

export default router