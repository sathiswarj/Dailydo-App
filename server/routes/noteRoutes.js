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

export default router;
