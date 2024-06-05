import mongoose from "mongoose";

const savedMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference User model
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Timestamp of save
});

// Optional: Create an index on userId and timestamp for efficient querying
savedMessageSchema.index({ userId: 1, timestamp: -1 });

// Using default export for SavedMessage
const SavedMessage = mongoose.model('SavedMessage', savedMessageSchema);
export default SavedMessage;
