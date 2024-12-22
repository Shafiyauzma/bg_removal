import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'

dotenv.config()

//App config
const PORT = process.env.PORT || 5000
const app = express()
await connectDB()

//Initialize middlewares
app.use(express.json())
app.use(cors())

//API routes
app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(PORT,()=>{
    console.log("Server is Running on Port "+PORT)
})