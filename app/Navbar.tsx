import React from 'react'
import Link from 'next/link'
import { GoBug } from "react-icons/go";

const Navbar = () => {
  const links = [
    { label: 'Dashboard', id: 2, href: '/' },
    { label: 'Issues', id: 3, href: '/issues' }
  ]

  return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-12 items-center'>
      <Link href='/'> <GoBug /></Link>
      {links.map(link => <Link
        className='text-zinc-500 hover:text-zinc-800 transition-colors'
        key={link.id}
        href={link.href}
      >{link.label}</Link>)}
    </nav>
  )
}

export default Navbar