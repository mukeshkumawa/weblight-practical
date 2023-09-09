import { Router } from "express"
const router = Router()
import CustomerCheckAuth from "../middleware/customer-check-auth.js"
import * as ProductController from "../controllers/product.js"
import AdminCheckAuth from "../middleware/admin-check-auth.js"
import MakeRequest from '../middleware/make-request.js'
import {
  productValidation
} from "../validation/validator.js"


router.post("/", MakeRequest, AdminCheckAuth, productValidation, ProductController.create)
router.get("/", MakeRequest, AdminCheckAuth, ProductController.list)
router.put("/:id", MakeRequest, AdminCheckAuth, productValidation, ProductController.update)
router.delete("/:id", MakeRequest, AdminCheckAuth, ProductController.destroy)

// // App routes goes here
router.get("/app", MakeRequest, CustomerCheckAuth, ProductController.appList)

export default router