import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRouter from './routes/userRouter.js';
import noteRouter from './routes/noteRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Optional health check route
app.get('/', (req, res) => {
    res.send("🟢 API is running...");
});

// Routes
app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port: ${PORT}`);
    });
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});
