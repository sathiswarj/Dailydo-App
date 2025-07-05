import userModel from '../model/userModel.js'
import express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password , name} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                isNew: false,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ email, password: hashPassword, name });
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            _id: newUser._id,
            email: newUser.email,
            isNew: true,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// router.get('/:userId', async (req, res) => {
//     try {
//         const { email } = req.params;
//         const response = await userModel.findOne({ email })
//         if (response) {
//             res.status(200).json({ message: "User data fetched" })
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is invalid" });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
             process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: "Login successful",
            _id: user._id,
            email: user.email,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default router;