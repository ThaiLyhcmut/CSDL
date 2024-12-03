import { Express } from "express"
import { prefixAdmin } from "../../configs/system"
import { dashboarhRouter } from "./dashboard.route"
import { categoryRouter } from "./category.route"

export const adminRoutes = (app: Express) => {

  app.use(`${prefixAdmin}/dashboard`, dashboarhRouter)
  app.use(`${prefixAdmin}/category`, categoryRouter)
}

