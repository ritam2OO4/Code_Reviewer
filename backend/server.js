// import app from "./src/app"
const app = require("./src/app")
// import http from "http"
const http = require("http")

const PORT = process.env.PORT || 3000

const server = http.createServer(app)


app.get("/",(_,res)=>{
    res.send("Hello")
})

app.listen(PORT,()=>{
    console.log("server is Running at port :",PORT)
})