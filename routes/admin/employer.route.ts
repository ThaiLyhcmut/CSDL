import express from "express"

const router = express.Router()
import * as controller from "../../controllers/admin/emloyer.controller"
router.get("/", controller.index)
router.get("/create", controller.getCreateEmployer)
router.post("/create", controller.postCreateEmployer)
router.delete("/delete/:id", controller.deleteEmployer)
router.patch("/edit/:id", controller.patchEditEmployer)
router.get("/edit/:id", controller.getEditEmployer)
export const employerRouter = router