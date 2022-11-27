import express from "express"
import postController from "../controllers/postController"

const router = express.Router()

router.post("", postController.createPost)
router.get("", postController.getAllPosts)

export default router
