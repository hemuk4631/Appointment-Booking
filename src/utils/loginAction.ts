import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

const handleSignIn = async (username: string, password: string) => {
  const toastId = toast.loading('Logging in...');
  console.log("Login Attempt:", { username });

  try {
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    
    console.log("Full SignIn Response Object:", JSON.stringify(res));

    if (res?.error) {
       console.error("Login Error from Provider:", res.error);
       // If it is a Configuration error, it usually means the server-side auth.ts crashed (e.g. DB error)
       const errorMsg = res.error === "Configuration" 
         ? "Login failed: Server configuration issue (check DB connection)"
         : res.error;

      toast.error(errorMsg, {
        id: toastId,
        position: 'top-right',
        duration: 5000,
      });
      return false;
    } 

    if (res?.ok) {
      console.log("Login Success - Redirecting...");
      toast.success('Login Success', {
        id: toastId,
        position: 'top-right',
      });
      return true;
    }
    
    return false;
  } catch (err) {
    console.error("Login Action Exception (Client Side):", err);
    toast.error('Caught error during login attempt', {
      id: toastId,
      position: 'top-right',
    });
    return false;
  }
};

export default handleSignIn;

