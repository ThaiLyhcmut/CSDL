import { Request, Response } from "express"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"
import { Recruitment } from "../../models/recruitment.model"
export const getRecruitmentId = async (req: Request, res: Response) => {
  const categoryId = req.params.id || ""
  let recruitments
  const careers = await sequelize.query(`CALL GetCareerRecruitmentCounts()`, {
    type: QueryTypes.RAW,
  })
  if (!categoryId){
    recruitments = await Recruitment.findAll({
      raw: true
    })
  }
  else{
    recruitments = await sequelize.query(`CALL GetCategoryRecumentById(:categoryId)`,{
      replacements: { categoryId },
      type: QueryTypes.RAW
    })
  } 
  console.log(careers)
  res.render("admin/pages/recruitment/index", {
    pageTitle: `Trang danh sach bai dang`,
    recruitments: recruitments,
    careers: careers,
    categoryId: categoryId
  })
}