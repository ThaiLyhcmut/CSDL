import express from "express"

const router = express.Router()
import * as controller from "../../controllers/admin/recruitment.controller"

router.get("/", controller.getRecruitmentId)
router.get("/create", controller.getRecruitmentCreate)
router.post("/create", controller.postRecruitmentCreate)
router.get("/edit/:id", controller.getRecruitmentIdDetail)
router.delete("/delete/:id", controller.deleteRecruitmentId)
router.patch("/edit/:id", controller.patchRecruitmentId)
router.get("/:id", controller.getRecruitmentId)




export const recruitmentRouter = router