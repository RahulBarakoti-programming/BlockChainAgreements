import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";
import authRouter from "./routers/authRouter.js"
import agreementRoute from "./routers/agreementRoute.js";


const app = express()

app.use(cors({
  origin: 'https://profound-kringle-c12b4c.netlify.app',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));



app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/agreement', agreementRoute)




export { app }