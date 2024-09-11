import { Router } from "express";
import signupValidation from "../middlewares/validatation.js";
import { signup } from "../controller/authController.js";

const router = Router()

router.post('/login', signupValidation, signup)

export default router;