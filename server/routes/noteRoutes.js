import express from 'express';
import mongoose from 'mongoose';
import noteModel from '../model/noteModel.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

// ✅ POST: Create a new note
router.post('/', verifyToken, async (req, res) => {
  const { title, description, time, priority, status } = req.body;
  const userId = req.user?.id;

  console.log("Incoming req.user:", req.user);
  if (!userId) {
    return res.status(400).json({ message: "Missing user ID from token" });
  }

  try {
    const newNote = new noteModel({ title, description, time, priority, status, userId });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", data: newNote });
  } catch (error) {
    console.error(" Error saving note:", error);
    res.status(500).json({ message: error.message });
  }
});


// ✅ GET: Fetch all notes (consider securing or paginating in production)
router.get('/all', async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({ message: "All notes fetched", data: notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET: Fetch notes by userId (with token check)
router.get('/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const notes = await noteModel.find({ userId: new mongoose.Types.ObjectId(userId) });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this user" });
    }

    return res.status(200).json({ data: notes });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
});

// ✅ GET: Fetch single note by ID
router.get('/note/:noteId', async (req, res) => {
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
    return res.status(500).json({ message: "Server error: " + error.message });
  }
});

// ✅ PUT: Update a note
router.put('/note/:noteId', verifyToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const note = await noteModel.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found or update failed" });
    }

    return res.status(200).json({ message: "Note updated", data: note });
  } catch (error) {
    console.error("Failed to update note:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
});

export default router;
