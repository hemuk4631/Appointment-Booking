'use client';

import React from 'react';
import Button from '../Button';
import Link from 'next/link';
import { toast } from 'sonner';
import handleSignIn from '@/utils/loginAction';
import { useRouter } from 'next/navigation';



function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!username || !password) {
      toast.error('Please provide all fields');
      return;
    }

    setLoading(true);
    const success = await handleSignIn(username, password);

    if (success) {
      window.location.href = "/";
    } else {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen gap-4 px-4"
    >
      <div className="border-2 rounded-md p-10 flex flex-col gap-4 min-w-fit w-1/3 shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          disabled={loading}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={loading}
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <span className="flex justify-center gap-2 text-sm">
          Not registered?{' '}
          <Link href={'/signUp'} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </span>
        <div className="flex items-center gap-2 my-2">
          <span className="w-full h-[1px] border-b border-gray-300"></span>
          <span className="text-gray-400 text-sm">or</span>
          <span className="w-full border-b h-[1px] border-gray-300"></span>
        </div>
        <div 
          onClick={() => toast.info('Google Sign-in coming soon!')}
          className="cursor-pointer"
        >
           <Button btnName="Sign in with Google" btnType={'secondary'} type={undefined} onClick={undefined} className={"w-full"} /> 
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
