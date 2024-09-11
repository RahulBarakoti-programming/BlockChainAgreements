import { app } from "../app";


app.get("/", function (req, res) {
  res.send("hello world")
})