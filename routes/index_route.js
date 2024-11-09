const home = require("./home_route")

module.exports = (app) => {
  app.use("/", home)
}