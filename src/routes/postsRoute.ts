import express from "express"
import postController from "../controllers/postController"
import { validateToken } from "../middlewares/authorization"

const router = express.Router()

router.post("", validateToken, postController.createPost)
router.get("", postController.getAllPosts)
router.get("/:post_id", postController.getPostById)

export default router
