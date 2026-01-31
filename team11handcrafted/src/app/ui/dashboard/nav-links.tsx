'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Artisans', href: '/dashboard/artisans' },
  { name: 'Products', href: '/dashboard/products' },
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
      
    </nav>
  );
}
