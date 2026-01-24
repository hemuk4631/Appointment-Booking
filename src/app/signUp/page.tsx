'use client';
import Link from 'next/link';
import { useState } from 'react';
import { handleSubmit } from '@/utils/signupAction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    if (loading) return;

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    setLoading(true);
    const result = await handleSubmit(name, email, username, password, role);
    setLoading(false);

    if (result.success) {
      toast.success('Sign up successful! Please login.');
      router.push('/login');
    } else {
      toast.error(result.error || 'Sign up failed');
    }
  };

  return (
    <form
      action={handleSignUp}
      className="flex flex-col items-center justify-center min-h-screen gap-4 px-4"
    >
      <div className="border-2 rounded-md p-10 flex flex-col gap-4 md:w-1/3 shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          disabled={loading}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          disabled={loading}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
            disabled={loading}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
          disabled={loading}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={loading}
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
        <span className="flex justify-center gap-2 items-center text-sm">
          Already User?{' '}
          <Link href={'/login'} className="text-blue-500 hover:underline ">
            Login
          </Link>
        </span>
      </div>
    </form>
  );
}
