import express from "express"

const router = express.Router()
import * as controller from "../../controllers/admin/category.controller"
router.get("/", controller.index)

export const categoryRouter = router