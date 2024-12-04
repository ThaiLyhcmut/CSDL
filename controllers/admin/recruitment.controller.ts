import { Request, Response } from "express"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"
import { Recruitment } from "../../models/recruitment.model"
import { User } from "../../models/user.model"
export const getRecruitmentId = async (req: Request, res: Response) => {
  try{
    const categoryId = req.params.id || ""
    const keyword = req.query.keyword || "";
    let recruitments
    const careers = await sequelize.query(`CALL GetCareerRecruitmentCounts()`, {
      type: QueryTypes.RAW,
    })
    if (!categoryId){
      const condition = keyword
        ? sequelize.literal(`title REGEXP :keyword OR description REGEXP :keyword`)
        : sequelize.literal('1 = 1');
      recruitments = await Recruitment.findAll({
        where: condition,
        replacements: keyword ? { keyword } : undefined,
        raw: true
      })
    }
    else{
      recruitments = await sequelize.query(`CALL GetCategoryRecumentById(:categoryId,:keyword)`,{
        replacements: { categoryId, keyword },
        type: QueryTypes.RAW
      })
    } 
    let totle  = 0
    careers.forEach((item: any, _) => {
      totle += item.totleRecruitId
    })
    res.render("admin/pages/recruitment/index", {
      pageTitle: `Trang danh sach bai dang`,
      recruitments: recruitments,
      careers: careers,
      categoryId: categoryId,
      keyword: keyword,
      totle: totle
    })
  }catch (err) {
    res.redirect(`/error/${err}`)
  }
}

export const getRecruitmentIdDetail = async (req: Request, res: Response) => {
  try {
    const careers = await sequelize.query(`CALL GetCareerRecruitmentCounts()`, {
      type: QueryTypes.RAW,
    })
    const recruitmentId = req.params.id
    const recruitment: any = await Recruitment.findOne({
      where: { recruitmentId: recruitmentId },
      raw: true
    });
    console.log(recruitment)
    res.render("admin/pages/recruitment/edit", {
      pageTitle: `Trang chi tiet bai dang cua ${recruitment.fullName}`
    })
  }catch (err) {
    res.redirect(`/error/${err}`)
  }
}