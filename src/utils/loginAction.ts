import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

const handleSignIn = async (username: string, password: string) => {
  const toastId = toast.loading('Logging in...');
try {
  const res = await signIn('credentials', {
    username,
    password,
    redirect: false,
  });
  if (res?.error) {
    toast.error(res?.error || 'Login failed', {
      id: toastId,
      position: 'top-right',
      duration: 6000,
    });
  } else {
    toast.success('Login Success', {
      id: toastId,
      position: 'top-right',
    });
    window.location.href = '/';
  }
} catch (err) {
  console.error(err);
}
};

export default handleSignIn;

