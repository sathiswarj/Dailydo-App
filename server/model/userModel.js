import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    phoneNo: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
