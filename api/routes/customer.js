import { Router } from "express"
const router = Router()
import CustomerCheckAuth from "../middleware/customer-check-auth.js"
import AdminCheckAuth from "../middleware/admin-check-auth.js"
import * as CustomerController from "../controllers/customer.js"
import MakeRequest from '../middleware/make-request.js'
import {
  customerRegister, customerLogin
} from "../validation/validator.js"


router.post("/login", MakeRequest, customerLogin, CustomerController.login)
router.post("/signup", MakeRequest, customerRegister, CustomerController.signUp)
router.patch("/auth", MakeRequest, CustomerCheckAuth, CustomerController.auth)

// Admin routes goes here
router.get("/admin", MakeRequest, AdminCheckAuth, CustomerController.list)

export default router