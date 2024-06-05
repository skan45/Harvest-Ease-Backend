import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: false },  // Add this if you use userId
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
export default User;