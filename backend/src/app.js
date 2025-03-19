const express = require("express")
require("dotenv").config()
const cors =  require("cors")
const app = express();
const AIRoutes = require("./routes/AIRoute")

app.use(express.json())
app.use(cors())

app.use("/Ai",AIRoutes)

module.exports = app