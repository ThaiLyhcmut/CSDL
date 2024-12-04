import express from "express"

const router = express.Router()
import * as controller from "../../controllers/admin/emloyer.controller"
router.get("/", controller.index)

export const employerRouter = router