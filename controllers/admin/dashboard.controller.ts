import { Request, Response} from "express"

export const index = async (req: Request, res: Response) => {
  try {
    res.render("admin/pages/dashboard/index", {
      pageTitle: "Chao mung ban den voi trang dashboarh",
    })
  }
  catch (err) {
    res.render("admin/pages/error/404", {
      code: 400,
      code_param: 0,
      msg: err
    });
  }
}