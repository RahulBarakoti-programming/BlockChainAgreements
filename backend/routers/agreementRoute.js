import { Router } from "express";
import ensureAuthenticated from "../middlewares/auth.js";
import { addClient, addFreelancer, agreementSend, agreementsSend, createAgreement } from "../controller/agreementController.js";


const agreementRoute = Router()

agreementRoute.get('/get', ensureAuthenticated, agreementsSend)
agreementRoute.get('/get/:id', ensureAuthenticated, agreementSend);
agreementRoute.post('/create', ensureAuthenticated, createAgreement);
agreementRoute.put('/create/signfree', ensureAuthenticated, addFreelancer);
agreementRoute.put('/create/signclient', ensureAuthenticated, addClient);




export default agreementRoute;






















