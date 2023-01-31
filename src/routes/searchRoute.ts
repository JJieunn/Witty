import express from "express"
import searchController from "../controllers/searchController"
import { validateToken } from "../middlewares/authorization"

const router = express.Router()

router.get("", validateToken, searchController.getPostByKeyword)
router.get("/user", searchController.getUserByKeyword)
router.get("/category", validateToken, searchController.getCategoryByKeyword)
router.get("/like", validateToken, searchController.getPostsByLiked)

export default router