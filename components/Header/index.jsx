import Link from 'next/link'
import SignInButton from '../SignInButton'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'
import { useState } from 'react'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="w-full px-4 py-4 bg-black fixed top-0 z-10">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold hover:brightness-105 transition-all">
              <span className="text-red-600">My</span>Flix
            </h1>
          </a>
        </Link>

        <nav>
          <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <CgClose
                size={26}
                fill="white"
                className="box-content p-1 bg-red-600 rounded-sm hover:brightness-90"
              />
            ) : (
              <GiHamburgerMenu
                size={26}
                fill="white"
                className="box-content p-1 bg-red-600 rounded-sm hover:brightness-90"
              />
            )}
          </button>

          <ul className="hidden sm:flex items-center gap-4">
            <li>
              <Link href="/">
                <a className="hover:text-red-100 transition-all">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <a className="hover:text-red-100 transition-all">Buscar</a>
              </Link>
            </li>
            <li>
              <SignInButton />
            </li>
          </ul>
        </nav>
      </div>

      <nav
        className={`${showMenu ? 'block' : 'hidden'} sm:hidden`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <ul className=" flex flex-col pt-4  showFromTop">
          <li className="border-t-2 border-red-600 border-opacity-30 py-2">
            <Link href="/">
              <a className="hover:text-red-100 transition-all">Home</a>
            </Link>
          </li>
          <li className="border-t-2 border-red-600 border-opacity-30 py-2">
            <Link href="/search">
              <a className="hover:text-red-100 transition-all">Buscar</a>
            </Link>
          </li>
          <li className="pt-2 border-t-2 border-red-600 border-opacity-30">
            <SignInButton />
          </li>
        </ul>
        <div
          onClick={() => setShowMenu(false)}
          className="fixed t-0 left-0 r-0 h-screen w-screen bg-black bg-opacity-30 showFromTransparency"
        />
      </nav>
    </header>
  )
}
