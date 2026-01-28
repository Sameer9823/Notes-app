'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
    const pathName = usePathname();
    const isActive = (pathname: string) => pathName === pathname;
  return (
    <nav className="p-4 bg-gray-200 mb-8 rounded">
      <ul className="flex space-x-4">
        <li>
        <Link href="/reviews/1" className={`px-4 py-2 rounded-lg transition ${isActive('/reviews/1') ? 'bg-blue-600 text-white font-semibold shadow' : 'text-gray-600 hover:bg-blue-600 hover:text-white'}`}>Home</Link>
        </li>
        <li>
        <Link href="/about" className={pathName === '/about' ? 'font-bold text-blue-600' : ''}>About</Link>
        </li>
        <li>
        <Link href="/reviews" className={pathName === '/reviews' ? 'font-bold text-blue-600' : ''}>Reviews</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation