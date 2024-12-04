import { Request, Response } from "express"
import { Career } from "../../models/career.model"
import { Category } from "../../models/category.model"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"

export const index = async (req: Request, res: Response) => {
  try {
    const careers = await sequelize.query(`CALL GetCareerRecruitmentCounts()`, {
      type: QueryTypes.RAW,
    })

    console.log(careers)
    res.render("admin/pages/category/index", {
      pageTitile: "Danh sách phân loại việc làm",
      careers: careers
    })
  }catch (err) {
    res.redirect(`/error/${err}`)
  }
}