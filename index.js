require('dotenv').config()
const database = require ("./config/database")
const express = require("express");
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const route = require("./routes/index_route")
app.use(methodOverride('_method'))

app.use(express.static(`${__dirname}/public`))
const port = process.env.PORT;


app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use(bodyParser.json())

app.use(cookieParser('COOK'))

route(app)

app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})