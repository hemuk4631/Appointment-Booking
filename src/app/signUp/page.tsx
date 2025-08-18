'use client';
import Link from 'next/link';
import { useState } from 'react';
import { handleSubmit } from '@/utils/signupAction';
export default function LoginPage() {
  const [role, setRole] = useState('');

  return (
    <form
      action={(formData) => {
        const name = formData?.get('name') as string | undefined;
        const email = formData?.get('email') as string | undefined;
        const username = formData?.get('username') as string | undefined;
        const password = formData?.get('password') as string | undefined;
        const role = formData?.get('role') as string | undefined;
        handleSubmit(name, email, username, password, role);
      }}
      className="flex flex-col items-center justify-center min-h-screen gap-4 px-4"
    >
      <div className="border-2 rounded-md p-10 flex flex-col gap-4 md:w-1/3">
        <input
          type="text"
          name="name"
          placeholder="name"
          required
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="border border-gray-300 rounded px-4 py-2"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Select Role<span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
        <span className="flex justify-center gap-2 items-center">
          Already User?{' '}
          <Link href={'/login'} className="text-blue-400 hover:underline ">
            Login
          </Link>
        </span>
        {/* <div className="flex items-center gap-2">
          <span className="w-full h-[1px] border-b"></span>
          <span className="text-gray-400">or</span>
          <span className="w-full border-b h-[1px]"></span>
        </div>
        <Button btnName="Sign in with google" btnType={'secondary'} /> */}
      </div>
    </form>
  );
}
