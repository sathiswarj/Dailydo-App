import userModel from '../model/userModel.js'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    const { phoneNo, email } = req.body;
    try {
        const existingUser = await userModel.findOne({ phoneNo });

        if (!existingUser) {
            const response = new userModel({ phoneNo, email });
            await response.save();
            return res.status(200).json({
                message: "User created successfully",
                _id: response._id,
                phoneNo: response.phoneNo,
                email: response.email,
                isNew: true,
            });
        }

        // ✅ If user exists, return their data with isNew = false
        return res.status(200).json({
            message: "User exists",
            _id: existingUser._id,
            phoneNo: existingUser.phoneNo,
            email: existingUser.email,

            isNew: false,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:userId', async (req, res) => {
    try {
        const { phoneNo } = req.params;
        const response = await userModel.findOne({ phoneNo })
        if (response) {
            res.status(200).json({ message: "User data fetched" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router;