import e, { Request, Response } from "express"
import { Employer } from "../../models/employer.model"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"
import { Company } from "../../models/company.model"
import { User } from "../../models/user.model"
import { prefixAdmin } from "../../configs/system"

export const index = async (req: Request, res: Response) => {
  try {
    const employers = await sequelize.query(`CALL GetEmployerDetails`, {
      type: QueryTypes.RAW
    })
    console.log(employers)
    res.render("admin/pages/employer/index", {
      pageTitle: "Trang quản lý nhà tuyển dụng",
      employers: employers
    })
  }catch (err) {
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}

export const postCreateEmployer = async (req: Request, res: Response) => {
  try{
    console.log(req.body)
    const dataUser = {
      email: req.body.email,
      fullName: req.body.fullName,
      birthday: req.body.birthday,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      role: 'Employer',
      adminUserID: null
    }
    const recordUser = await User.create(dataUser)
    const dataEmployer = {
      employerId: recordUser.dataValues.userId,
      companyId: req.body.companyId
    }
    await Employer.create(dataEmployer)
    res.redirect(`${prefixAdmin}/employer`)
  }catch(err) {
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}

export const getCreateEmployer = async (req: Request, res: Response) => {
  const company = await Company.findAll({
    raw: true
  })
  console.log(company)
  res.render("admin/pages/employer/create", {
    pageTitle: "Them moi nha tuyen dung",
    company: company
  })
}

export const deleteEmployer = async (req: Request, res: Response) => {
  try{
    const exitsUser = await User.findOne({
      where: {
        userId: req.params.id
      },
      raw: true
    })
    if (exitsUser){
      await Employer.destroy({
        where: {
          employerId: req.params.id
        }
      })
      await User.destroy({
        where: {
          userId: req.params.id
        }
      })
    }
    res.status(200).json({
      "code": "success"
    })
  }catch (err) {
    res.status(400).json({
      "code": "error",
      msg: "Bị gàn buộc bởi bài đăng của User này"
    })
  }
}

export const getEditEmployer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if(!id){
      res.redirect("back")
    }
    const exitsUser = await User.findOne({
      where: {
        userId: id
      },
      raw: true
    })
    if(exitsUser){
      console.log(exitsUser)
      res.render("admin/pages/employer/edit", {
        pageTile: "Chỉnh sửa thông tin của nhà tuyển dụng",
        User: exitsUser
      })
    }
    else res.redirect("back")
  }catch(err){
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}

export const patchEditEmployer = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id, req.body)
    if(!req.params.id){
      res.redirect("back")
    }
    const dataUser = {
      fullName: req.body.fullName,
      birthday: req.body.birthday,
      gender: req.body.gender,
      address: req.body.address
    }
    const exitsUser = await User.findOne({
      where: {
        userId: req.params.id
      },
      raw: true
    })
    if(exitsUser){
      await User.update(dataUser,{
        where: {
          userId: req.params.id
        }
      })
    }
    res.redirect(`${prefixAdmin}/employer`)
  }catch (err) {
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}