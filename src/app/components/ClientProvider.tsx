'use client'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { Toaster } from '@/components/ui/sonner';
import Header from './Header';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

function ClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Provider store={store}>
        <SessionProvider key={pathname}>
      {!['/login', '/signUp'].includes(pathname) && <Header />}
      {children}
      <Toaster />
      </SessionProvider>
    </Provider>
  );
}
export default ClientProvider