'use server';
import { signIn } from '@/auth';
import { connectDB } from '@/lib/mongodb';
import { CredentialsSignin } from 'next-auth';

const handleSignIn = async (username: string, password: string) => {
  await connectDB();
  try {
    await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err;
  }
};
export default handleSignIn;
