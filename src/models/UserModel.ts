import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: {type:String, required: true},
  googleId: { type: String },
});
export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
