import express from "express"

const router = express.Router()
import * as controller from "../../controllers/admin/category.controller"
router.get("/", controller.index)
router.get("/create", controller.getCategory)
router.post("/create", controller.postCategory)
router.delete("/delete/:id", controller.deleteCategory)
export const categoryRouter = router