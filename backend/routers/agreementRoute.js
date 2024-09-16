import { Router } from "express";
import ensureAuthenticated from "../middlewares/auth.js";
import { addClient, addFreelancer, agreementSend, agreementsSend, createAgreement, updateByClient, updateByFreelancer } from "../controller/agreementController.js";


const agreementRoute = Router()

agreementRoute.get('/get', ensureAuthenticated, agreementsSend)
agreementRoute.get('/get/:id', ensureAuthenticated, agreementSend);
agreementRoute.post('/create', ensureAuthenticated, createAgreement);
agreementRoute.put('/create/signfree', ensureAuthenticated, addFreelancer);
agreementRoute.put('/create/signclient', ensureAuthenticated, addClient);
agreementRoute.put('/create/updatebyclient', ensureAuthenticated, updateByClient);
agreementRoute.put('/create/updatebyfreelancer', ensureAuthenticated, updateByFreelancer);




export default agreementRoute;






















