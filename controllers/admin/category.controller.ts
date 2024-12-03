import { Request, Response } from "express"
import { Career } from "../../models/career.model"

export const index = async (req: Request, res: Response) => {

  const careers = await Career.findAll({
    raw: true
  })
  console.log(careers)

  res.render("admin/pages/category/index", {
    pageTitile: "Danh sách phân loại việc làm",
    careers: careers
  })
}