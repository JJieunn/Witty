import express from "express"
import postController from "../controllers/postController"
import commentController from "../controllers/commentController"
import { validateToken, validateTokenBycondition } from "../middlewares/authorization"

const router = express.Router()

router.post("", validateToken, postController.createPost)
router.get("", validateTokenBycondition, postController.getAllPosts)
router.get("/:post_id", validateTokenBycondition, postController.getPostById)
router.patch("/:post_id", validateToken, postController.updatePost)
router.delete("/:post_id", validateToken, postController.deletePost)
router.patch("/:post_id/like", validateToken, postController.updatePostLikeByUser)
router.patch("/:post_id/bookmark", validateToken, postController.updatePostBookmark)
router.post("/:post_id/comment", validateToken, commentController.createComment)
router.delete("/:post_id/:comment_id", validateToken, commentController.deleteComment)
export default router
