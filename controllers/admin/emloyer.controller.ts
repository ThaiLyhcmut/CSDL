import e, { Request, Response } from "express"
import { Employer } from "../../models/employer.model"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"

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