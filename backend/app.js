import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";
import authRouter from "./routers/authRouter.js"
import agreementRoute from "./routers/agreementRoute.js";


const app = express()

app.use(cors())


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/agreement', agreementRoute)




export { app }