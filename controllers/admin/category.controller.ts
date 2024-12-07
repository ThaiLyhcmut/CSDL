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
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}

export const getCategory = async (req: Request, res: Response) => {
  res.render("admin/pages/category/create", {
    pageTitle: "Trang them moi danh muc"
  })
}

export const postCategory = async (req: Request, res: Response) => {
  try{
    const name_param = req.body.name
    const record = await sequelize.query('CALL InsertCareer(:name_param)', {
      replacements: { name_param },
      raw: true
    })
    res.redirect("/admin/category")
  }catch (err){
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try{
    const carrerId_param = req.params.id
    const record = await sequelize.query('CALL DeleteCareerById(:carrerId_param)', {
      replacements: {carrerId_param},
      raw: true
    })
    res.status(200).json({
      "code": "success",
      "msg": "Xóa bản ghi thành công"
    })
  }catch (err){
    res.status(400).json({
      "code": "error",
      "msg": "Bị gàn buộc bỡi bài đăng"
    })
  }
}