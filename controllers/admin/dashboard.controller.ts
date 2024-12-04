import { Request, Response} from "express"

export const index = async (req: Request, res: Response) => {
  try {
    res.render("admin/pages/dashboard/index", {
      pageTitle: "Chao mung ban den voi trang dashboarh",
    })
  }
  catch (err) {
    res.redirect(`/error/${err}`)
  }
}