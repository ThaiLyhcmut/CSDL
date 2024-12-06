import { Request, Response } from "express"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"
import { Recruitment } from "../../models/recruitment.model"
import { User } from "../../models/user.model"
import { Category } from "../../models/category.model"
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
    const recruitment:any = await Recruitment.findOne({
      where: { recruitmentId: recruitmentId },
      include: [
        {
          model: Category,
          where: {recruitmentId: recruitmentId},
          required: true
        }
      ],
      raw: true
    });
    const employerId:Number = recruitment.employerId
    const [result]: any =  await sequelize.query('SELECT GetNamebyEmployerId(:employerId) AS fullName', {
      replacements: { employerId },
      type: QueryTypes.SELECT
    })
    console.log(careers)
    res.render("admin/pages/recruitment/edit", {
      pageTitle: `Trang chi tiet bai dang cua ${result.fullName}`,
      recruitment: recruitment,
      recruitmentId: recruitmentId,
      careers: careers,
      categoryId: recruitment['Categories.categoryId'],
      // employers: employers
    })
  }catch (err) {
    res.redirect(`/error/${err}`)
  }
}

export const deleteRecruitmentId = async (req: Request, res: Response) => {
  try {
    const recruitmentId = req.params.id
    const result = await sequelize.query('CALL DeleteRecruitmentId(:recruitmentId)', {
      replacements: { recruitmentId },
      raw: true
    })
    console.log(result[0]["success"])
    if (result[0]["success"] == 1){
      res.status(200).json({
        "code": "success",
        "msg": "Xoa thanh cong"
      })
      return 
    }
    res.status(400).json({
      "code": "error",
      "msg": "Xoa khong thanh cong"
    })
  }catch (err) {
    res.redirect(`/error/${err}`)
  }
}

export const getRecruitmentCreate = async(req: Request, res: Response) => {
  try {
    const employers = await sequelize.query('CALL process_employers()', {
      type: QueryTypes.RAW,
    })
    console.log(employers)
    const careers = await sequelize.query(`CALL GetCareerRecruitmentCounts()`, {
      type: QueryTypes.RAW,
    })
    res.render("admin/pages/recruitment/create", {
      careers: careers,
      employers: employers
    })
  }catch (err){
    res.redirect(`/error/${err}`)
  }
}

export const postRecruitmentCreate = async (req: Request, res: Response) => {
  try{
    console.log(req.body)
    const data = {
      employerId_param: parseInt(req.body.employer_id),
      title_param: req.body.title,
      workPosition_param: req.body.position,
      location_param: req.body.location,
      description_param: req.body.description,
      experience_param: req.body.experience,
      salary_param: parseFloat(req.body.salary),
      openings_param: parseInt(req.body.numbers),
      deadline_param: req.body.deadline,
      categoryId_param: req.body.category_id
    }
    const record = sequelize.query('CALL InsertRecruitment(:employerId_param, :title_param, :workPosition_param, :location_param, :description_param, :experience_param, :salary_param, :openings_param, :deadline_param, :categoryId_param)', {
      replacements: data,
      raw: true
    })
    res.redirect("/admin/recruitment")
  }catch (err){
    res.redirect(`/error/${err}`)
  }
}

export const patchRecruitmentId = async (req: Request, res: Response) => {
  try{
    console.log(req.body.category_id)
    const recruitmentId = req.params.id
    console.log(recruitmentId)
    const data = {
      recruitmentId_param: parseInt(recruitmentId),
      title_param: req.body.title,
      workPosition_param: req.body.position,
      location_param: req.body.location,
      description_param: req.body.description,
      experience_param: req.body.experience,
      salary_param: parseFloat(req.body.salary),
      theNumberOfOpenings_param: parseInt(req.body.numbers),
      deadline_param: req.body.deadline,
      categoryId: req.body.category_id
    }
    const record = await sequelize.query('CALL UpdateRecruitment(:recruitmentId_param, :title_param, :workPosition_param, :location_param, :description_param, :experience_param, :salary_param, :theNumberOfOpenings_param, :deadline_param, :categoryId)', {
      replacements: data,
      raw: true
    })
    res.redirect("/admin/recruitment")
  }catch (err){
    res.redirect(`/error/${err}`)
  }
}