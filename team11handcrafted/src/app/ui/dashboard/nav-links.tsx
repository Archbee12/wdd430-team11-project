'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { logoutUser } from '@/app/auth';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon},
  { name: 'Artisans', href: '/dashboard/artisans', icon: UserGroupIcon },
  { name: 'Products', href: '/dashboard/products', icon: ShoppingBagIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="nav-container">
      {/* Top links */}
      <ul className="nav-links">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-icon" />
                <span className="nav-text">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Sidenav divider */}
      <div className="nav-divider" />

      <div className="nav-bottom">
        
        <form action={logoutUser} >
          <button type="submit" className="nav-link signout">
            <ArrowLeftEndOnRectangleIcon className="nav-icon" />
            <span className="nav-text">Sign Out</span>
          </button>
        </form>
      </div>
      
    </nav>
  );
}
