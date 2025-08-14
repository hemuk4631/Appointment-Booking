'use client';

import React from 'react';
import Button from '../Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';


function LoginForm() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!username || !password) {
      toast.error('Please provide all fields');
      return;
    }

    const toastId = toast.loading('Logging in...');

    const res = await signIn('credentials', {
      username,
      password,
      callbackUrl: '/', // Let NextAuth handle the redirect
      redirect: true,   // Important for production
    });

    if (res?.error) {
      toast.error(res.error || 'Login failed', {
        id: toastId,
        position: 'top-right',
      });
    } else {
      toast.success('Login Success', {
        id: toastId,
        position: 'top-right',
      });
    
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen gap-4 px-4"
    >
      <div className="border-2 rounded-md p-10 flex flex-col gap-4 min-w-fit w-1/3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        <span className="flex justify-center gap-2">
          Not registered?{' '}
          <Link href={'/signUp'} className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </span>
        <div className="flex items-center gap-2">
          <span className="w-full h-[1px] border-b"></span>
          <span className="text-gray-400">or</span>
          <span className="w-full border-b h-[1px]"></span>
        </div>
        <Button btnName="Sign in with Google" btnType={'secondary'} />
      </div>
    </form>
  );
}

export default LoginForm;
