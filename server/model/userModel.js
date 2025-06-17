import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName:{
        type: String
    },
    phoneNo:{
        type: Number
    }
}, { timestamps: true })

 const userModel = mongoose.model( "customer" ,userSchema)
 export default userModel