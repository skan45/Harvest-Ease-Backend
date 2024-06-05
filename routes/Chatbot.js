import express from "express";
import SavedMessage from "../models/savedMessages.js"; // Ensure this import matches the default export
import mongoose from 'mongoose';
const router = express.Router();

// Endpoint to save a message
router.post("/save-message", async (req, res) => {
  const { message, userId } = req.body; // Assume userId is passed along with message
  if (!message || !userId) {
    return res.status(400).send("Missing message content or user ID");
  }

  try {
    const newSavedMessage = new SavedMessage({
      userId: mongoose.Types.ObjectId(userId), // Ensure this is a valid ObjectId
      message: message,
      timestamp: Date.now() // Optional, since default is already Date.now()
    });
    await newSavedMessage.save(); // Save the message to MongoDB
    res.status(201).send("Message saved successfully");
  } catch (error) {
    console.error("Failed to save message:", error);
    res.status(500).send("Failed to save message");
  }
});

// Endpoint to retrieve all saved messages
router.get("/saved-messages", async (req, res) => {
  try {
    const messages = await SavedMessage.find({}); // Retrieve all messages from MongoDB
    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).send("Failed to retrieve messages");
  }
});

// Endpoint to unsave a message
router.delete("/unsave-message/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SavedMessage.findByIdAndDelete(id);
    if (result) {
      res.send("Message unsaved successfully");
    } else {
      res.status(404).send("Message not found");
    }
  } catch (error) {
    console.error("Failed to delete message:", error);
    res.status(500).send("Failed to delete message");
  }
});

export default router;
