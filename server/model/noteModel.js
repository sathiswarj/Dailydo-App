import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  time:{
    type: Date,
  },
   priority:{
    type: String,
    enum: ["Low", "Medium", "High"],
  },
   status:{
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
  },

}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
export default Note;
