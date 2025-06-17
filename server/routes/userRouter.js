import userModel from '../model/userModel.js'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    const { userName, phoneNo } = req.body;
    try {
        const response = await userModel({ userName, phoneNo })
        await response.save()
        if (response) {
            res.status(200).json({ message: "User stored successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:userId', async(req,res) =>{
    try {
        const {phoneNo} = req.params;
        const response = await userModel.findOne({phoneNo})
        if(response){
            res.status(200).json({message : "User data fetched"})
        }
    } catch (error) {
            res.status(500).json({message: error.message})      
    }
})
export default router;