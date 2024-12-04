import express from "express"

const router = express.Router()
import * as controller from "../../controllers/admin/recruitment.controller"

router.get("/", controller.getRecruitmentId)
router.get("/:id", controller.getRecruitmentId)


export const recruitmentRouter = router