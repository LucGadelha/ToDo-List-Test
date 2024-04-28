import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
      <header className="text-3xl font-bold text-white w-full text-center shadow-lg p-4 bg-blue-900 mb-4">
        <Link href="/">
          To Do List
        </Link>
      </header>
  )
}

export default Header
