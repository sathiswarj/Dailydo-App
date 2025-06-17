import  {postModel} from '../model/postModel.js'
import mongoose from 'mongoose'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        const response = await postModel({ title, description })
        await response.save()
        if (response) {
            res.status(200).json({ message: "Post Stored successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async(req,res) =>{
    try {
        const response = await postModel.find()
        if(response){
            res.status(200).json({message : "All post fetched"})
        }
    } catch (error) {
            res.status(500).json({message: error.message})      
    }
})
export default router;