import express from "express"
import postController from "../controllers/postController"

const router = express.Router()

router.post("", postController.createPost)
router.get("", postController.getAllPosts)
router.get("/:post_id", postController.getPostById)

export default router
