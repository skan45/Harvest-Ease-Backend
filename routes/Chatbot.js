const express=require("express")

import express from "express";
import SavedMessage from "../models/savedMessages.js"; // Import using relative path
console.log('hello');
const router = express.Router();
const savedMessages = []; // Array to store saved messages (temporary)

// Generate a unique ID for new saved messages (replace with a real solution later)
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Endpoint to save a message
router.post("/save-message", (req, res) => {
  const { message } = req.body; // Get the message from the request body
  console.log("Saving message:", message);

  if (!message) {
    return res.status(400).send("Missing message content"); // Error handling for missing message
  }

  const savedMessage = new SavedMessage(generateId(), message, Date.now());
  savedMessages.push(savedMessage); // Add message to the temporary array (replace with persistent storage later)

  res.status(201).send("Message saved successfully");
});

// Endpoint to retrieve all saved messages
router.get("/saved-messages", (req, res) => {
  res.json(savedMessages); // Send the list of saved messages
});

// Endpoint to unsave a message (implement logic based on ID)
router.delete("/unsave-message/:id", (req, res) => {
  const { id } = req.params; // Get the message ID from the URL
  const index = savedMessages.findIndex(message => message.id === id);

  if (index === -1) {
    return res.status(404).send("Message not found"); // Error handling for invalid ID
  }

  savedMessages.splice(index, 1); // Remove the message from the array

  res.send("Message unsaved successfully");
});

export default router;