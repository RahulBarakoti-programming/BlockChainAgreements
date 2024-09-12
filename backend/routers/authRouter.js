import { Router } from "express";
import { loginValidation, signupValidation } from "../middlewares/validatation.js";
import { login, signup } from "../controller/authController.js";

const router = Router()

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)

export default router;