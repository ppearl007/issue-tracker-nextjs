'use client'

import React from 'react'
import Link from 'next/link'
import { GoBug } from "react-icons/go";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const Navbar = () => {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', id: 2, href: '/' },
    { label: 'Issues', id: 3, href: '/issues' }
  ]

  return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-12 items-center'>
      <Link href='/'> <GoBug /></Link>
      {links.map(link => <Link
        className={classNames({
          'text-zinc-900': link.href === currentPath,
          'text-zinc-500': link.href !== currentPath,
          'hover:text-zinc-800': true
        })} 
        key={link.id}
        href={link.href}
      >{link.label}</Link>)}
    </nav>
  )
}

export default Navbar