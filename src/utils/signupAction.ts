'use server';

import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/UserModel';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

export const handleSubmit = async (name, email, username, password, role) => {
  console.log("Signup Request:", { name, email, username, role }); // Log input (excluding password)
  
  try {
    if (!username || !password || !email || !name || !role) {
       console.log("Signup Validation Failed: Missing fields");
       return { success: false, error: 'Please provide all fields' };
    }
    
    await connectDB();
    console.log("DB Connected for Signup");

    const user = await User.findOne({ username });
    if (user) {
        console.log("Signup Failed: User exists");
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
    console.log("User Created Successfully");
    
    return { success: true };
  } catch (error) {
    console.error("Signup error details:", error);
    return { success: false, error: 'Something went wrong during sign up' };
  }
};
