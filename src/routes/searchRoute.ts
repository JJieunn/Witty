import express from "express"
import searchController from "../controllers/searchController"
import { validateTokenBycondition } from "../middlewares/authorization"

const router = express.Router()

router.get("", validateTokenBycondition, searchController.getPostByKeyword)
router.get("/user", searchController.getUserByKeyword)
router.get("/category", validateTokenBycondition, searchController.getCategoryByKeyword)

export default router