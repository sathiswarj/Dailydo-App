import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const postModel = mongoose.model("post", postSchema)
