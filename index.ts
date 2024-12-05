import express, { Express } from "express"
import dotenv from "dotenv"
dotenv.config()
import sequelize from "./configs/database";
import { adminRoutes } from "./routes/admin/index.route";
import { prefixAdmin } from "./configs/system";
import methodOverride from "method-override";
import bodyParser from "body-parser";
// import { routesClient } from "./routes/client/index.route";

sequelize

const app: Express = express();
const port: number = 3000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride("_method"));
app.set('views', `${__dirname}/views`)
app.set('view engine', `pug`)
app.use(express.static(`${__dirname}/public`)); 
app.locals.prefixAdmin = prefixAdmin;
adminRoutes(app)
// routesClient(app)

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})