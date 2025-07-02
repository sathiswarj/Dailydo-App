import noteModel from '../model/noteModel.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// POST: Create a new note
router.post('/', async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const newNote = new noteModel({ title, description, userId });
    await newNote.save();
    res.status(200).json({ message: "Post stored successfully", data: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch all notes (or notes by userId if filtering is needed)
router.get('/all', async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({ message: "All posts fetched", data: notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch notes by userId (assuming schema supports participants)

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const notes = await noteModel.find({ userId: new mongoose.Types.ObjectId(userId) });

    if (notes.length > 0) {
      return res.status(200).json({ data: notes });
    } else {
      return res.status(404).json({ message: "No notes found for this user" });
    }
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
  
});

router.get("/note/:noteId", async (req, res) => {
  const { noteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const note = await noteModel.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
        return res.status(200).json({ data: note });

  } catch (error) {
        console.error("Failed to fetch note:", error);
  }

});


// routes/notes.js  (example file name)

router.get("/note/:noteId", async (req, res) => {
  const { noteId } = req.params;

  // 1️⃣ Validate the Mongo ObjectId
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    // 2️⃣ Find the note
    const note = await noteModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 3️⃣ Success response
    return res.status(200).json({ data: note });
  } catch (error) {
    console.error("Failed to fetch note:", error);

    // 4️⃣ Server‑side error
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/note/:noteId", async(req,res)=>{
  const {noteId} = req.params;
  const { title, description, userId } = req.body;
  try {
    const note = await noteModel.findByIdAndUpdate(noteId,
      {title, description},
      {new: true}
    )
     if (!note) {
    return res.status(404).json({ message: "Note was not update" });
  }
    return res.status(200).json({ data: note });

  } catch (error) {
      console.error("Failed to update notes:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }  
})

export default router;
