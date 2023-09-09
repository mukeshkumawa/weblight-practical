import { Router } from "express"
const router = Router()
import CustomerCheckAuth from "../middleware/customer-check-auth.js"
import * as CategoryController from "../controllers/category.js"
import AdminCheckAuth from "../middleware/admin-check-auth.js"
import MakeRequest from '../middleware/make-request.js'
import {
  categoryValidation
} from "../validation/validator.js"


router.post("/", MakeRequest, AdminCheckAuth, categoryValidation, CategoryController.create)
router.get("/", MakeRequest, AdminCheckAuth, CategoryController.list)
router.put("/:id", MakeRequest, AdminCheckAuth, categoryValidation, CategoryController.update)
router.delete("/:id", MakeRequest, AdminCheckAuth, CategoryController.destroy)

// // App routes goes here
router.get("/app", MakeRequest, CustomerCheckAuth, CategoryController.appList)

export default router