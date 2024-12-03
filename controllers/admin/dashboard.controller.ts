import { Request, Response} from "express"

export const index = async (req: Request, res: Response) => {
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Chao mung ban den voi trang dashboarh",
  })
}