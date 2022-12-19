import express from "express"
import { validateToken } from "../middlewares/authorization"
import commentController from "../controllers/commentController"

const router = express.Router()

router.patch("/:comment_id/like", validateToken, commentController.updateCommentLike)

export default router