import { Express } from "express"
import { prefixAdmin } from "../../configs/system"
import { dashboarhRouter } from "./dashboard.route"
import { categoryRouter } from "./category.route"
import { recruitmentRouter } from "./recruitment.route"
import { employerRouter } from "./employer.route"

export const adminRoutes = (app: Express) => {

  app.use(`${prefixAdmin}/dashboard`, dashboarhRouter)
  app.use(`${prefixAdmin}/category`, categoryRouter)
  app.use(`${prefixAdmin}/recruitment`, recruitmentRouter)
  app.use(`${prefixAdmin}/employer`, employerRouter)
  app.get("*", (req, res) => {
    res.render("admin/pages/error/404", {
      code: 404,
      code_param: 4,
      msg: "Không tìm thấy đường dẫn"
    });
  });
}

