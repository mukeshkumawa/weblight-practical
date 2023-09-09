import { Router } from "express"
const router = Router()
import AdminCheckAuth from "../middleware/admin-check-auth.js"
import * as AdminController from "../controllers/admin.js"
import MakeRequest from '../middleware/make-request.js'
import { adminRegister, adminLogin } from "./../validation/validator.js"


router.post("/signup", MakeRequest, adminRegister, AdminController.signup)
router.post("/login", MakeRequest, adminLogin, AdminController.login)
router.patch("/auth", MakeRequest, AdminCheckAuth, AdminController.auth)
export default router