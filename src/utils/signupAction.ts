'use server';

import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/UserModel';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

export const handleSubmit = async (name, email, username, password, role) => {
  if (!username || !password || !email || !name || !role)
    throw new Error('Please provide all fields');
  await connectDB();
  const user = await User.findOne({ username });
  if (user) throw new Error('Username already exists');
  const hashedPassword = await hash(password, 12);
  User.create({
    name,
    username,
    email,
    password: hashedPassword,
    role: role,
  });
  redirect('/login');
};
