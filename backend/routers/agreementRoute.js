import { Router } from "express";
import ensureAuthenticated from "../middlewares/auth";
import { agreementSend, agreementsSend } from "../controller/agreementController";


const agreementRoute = Router()

agreementRoute.get('/agreements', ensureAuthenticated, agreementsSend)

agreementRoute.get('/agreement/:id', ensureAuthenticated, agreementSend);



export default agreementRoute;