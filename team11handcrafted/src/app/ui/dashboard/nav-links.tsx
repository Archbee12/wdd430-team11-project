'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Artisans', href: '/dashboard/artisans' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'Reviews', href: '/dashboard/reviews' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="nav-container">
      {/* Top links */}
      <ul className="nav-links">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      
      {/* Sidenav divider */}
      <div className="nav-divider" />

      {/* Bottom section */}
      <div className="nav-bottom">

        <button className="nav-link signout">
          Sign Out
        </button>
      </div>
    </nav>
  );
}
