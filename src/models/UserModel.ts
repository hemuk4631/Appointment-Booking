import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  googleId?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true },
  googleId: { type: String },
});

export const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema);
