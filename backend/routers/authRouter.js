import { Router } from "express";
import { loginValidation, signupValidation } from "../middlewares/validatation.js";
import { login, signup } from "../controller/authController.js";
import ensureAuthenticated from "../middlewares/auth.js";

const router = Router()

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)
router.get('/verify-token', ensureAuthenticated, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, isValid: true });
});


export default router;