const express=require("express")
const app=express()
const mysql=require("mysql2")
const cors=require("cors")
require("dotenv").config()
require("./db/connection")
const router=require("./routes/router")
const port=8000;
app.use(express.json())
app.use(cors())
app.use("/v1",router)



app.listen(port,()=>{
    console.log("server is running.. "+port)
})