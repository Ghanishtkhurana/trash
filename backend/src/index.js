require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("../config/db")
const PORT = process.env.PORT;
const cookie = require("cookie-parser");
const AllRoutes = require("../routes");
const {Notification} = require("../controllers/Notification/AddNotification")

const corsOptions = {
    origin: [
      "http://localhost:3000",
      
    ],
    credentials: true,
  };
app.use(cors(corsOptions))
app.use(cookie())
app.use(express.json())

app.use("/api",AllRoutes)



app.get("/",async(req,res)=>{
    try {
        return res.status(200).json({message : "Hello HomePage",status : true})
    } catch (error) {
        return res.status(400).json({message : error.message , status : true})
    }
})


app.listen(PORT,async()=>{
    try {
        await connect()
        console.log(`Server Connected to http://localhost:${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})
