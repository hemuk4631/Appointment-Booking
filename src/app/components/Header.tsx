import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <div className='flex gap-4 p-6 bg-amber-50 sticky top-0 z-50'>
        <Link  href={'/'}>Home</Link>
        <Link  href={'/appointments'}>Appointments</Link>
    </div>
  )
}

export default Header