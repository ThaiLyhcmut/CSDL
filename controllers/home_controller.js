module.exports.index = (req, res) => {
  res.render("pages/home.pug", {
    Pagetitle: "Trang chủ"
  })
}
