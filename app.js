import dbConfig from './api/config/db.js'
import body_parser from "body-parser"
import expand from "dotenv-expand"
import mongoose from "mongoose"
expand.expand(dotenv.config())
import express from "express"
import dotenv from "dotenv"
const app = express()
import morgan from "morgan"


/*Routes Define goes here*/
import AdminRoutes from './api/routes/admin.js'
import ProductRoutes from './api/routes/product.js'
import CustomerRoutes from './api/routes/customer.js'
import CategoryRoutes from './api/routes/category.js'
/*End of Routes Define*/

mongoose.Promise = global.Promise

// debug middleware check api console
app.use(morgan("dev"))

// json data accept 
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE")
    return res.status(200).json({})
  }
  next()
})

/*Create Route Groups Here*/
app.use('/v1/admin', AdminRoutes)
app.use('/v1/customer', CustomerRoutes)
app.use('/v1/category', CategoryRoutes)
app.use('/v1/product', ProductRoutes)
/*End Route Groups Here*/

// 404 error
app.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message,
  })
})

export default app