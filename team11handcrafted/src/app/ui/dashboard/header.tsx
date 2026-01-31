import Link from 'next/link';
import { poppins } from '@/app/ui/fonts';

export default function Header() {
  return (
    <header>
      <Link href="/dashboard" className="sidenav-logo">
        <h1 className={poppins.className}>Handcrafted Haven</h1>
      </Link>
      <nav>
        <Link href="/signin">Sign In</Link>
      </nav>
    </header>
  );
}
