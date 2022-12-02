import express from "express"
import postController from "../controllers/postController"
import { validateToken, validateTokenBycondition } from "../middlewares/authorization"

const router = express.Router()

router.post("", validateToken, postController.createPost)
router.get("", validateTokenBycondition, postController.getAllPosts)
router.get("/:post_id", validateTokenBycondition, postController.getPostById)
router.patch("/:post_id/like", validateToken, postController.updatePostLikeByUser)

export default router
