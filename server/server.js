 import express from 'express'
const app = express()
import  cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
const PORT = process.env.PORT || 4000
import postRouter from './routes/postRoutes.js'
import userRouter from './routes/userRouter.js'

dotenv.config();
app.use(express.json())
app.use(cors())

// app.use('/', (req,res) =>{
//     res.send("Hi")
// })

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connected")
})
.catch((err) =>{
    console.log("Connection failed :" , err)
})

app.use('/api/notes', postRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () =>{
    console.log(`Server is running on : ${PORT}`)
})