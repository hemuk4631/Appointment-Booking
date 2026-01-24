'use server';

import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/UserModel';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

export const handleSubmit = async (name, email, username, password, role) => {
  
  
  try {
    if (!username || !password || !email || !name || !role) {
       
       return { success: false, error: 'Please provide all fields' };
    }
    
    await connectDB();

    const user = await User.findOne({ username });
    if (user) {
        return { success: false, error: 'Username already exists' };
    }

    const hashedPassword = await hash(password, 12);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role,
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Something went wrong during sign up' };
  }
};
