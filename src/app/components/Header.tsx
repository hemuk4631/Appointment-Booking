'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { logoutAction } from '@/utils/logoutAction';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/store/slices/userSlice';
import React from 'react';
const  Header  = React.memo(function Header(){
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  const user = session?.user;
  console.log(session);
  const handleLogout = async () => {
    dispatch(resetUser());
    await logoutAction();
  };

  const userTabs = [{ title: 'Home', pathname: '/' }];
  const adminTabs = [
    { title: 'Home', pathname: '/' },
    { title: 'Appointments', pathname: '/appointments' },
  ];

  const headerTabs = user?.role === 'ADMIN' ? adminTabs : userTabs;

  return (
    <div className="p-6 w-screen bg-amber-50 sticky top-0 z-50 flex justify-between">
      <div className="flex gap-4">
        {headerTabs.map((ele, i) => (
          <Link key={i} href={ele.pathname}>
            {ele.title}
          </Link>
        ))}
      </div>

      <div className="flex justify-end gap-4 items-center">
        <button onClick={handleLogout} className="text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
}) 

export default Header;
