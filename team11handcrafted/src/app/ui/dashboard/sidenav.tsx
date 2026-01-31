import NavLinks from '@/app/ui/dashboard/nav-links';
// import Link from 'next/link';

export default function SideNav() {
  return (
    <nav className="sidenav">
      {/* <Link href="/" className="sidenav-logo">
        Haven Handcraft
      </Link> */}

      <NavLinks />

      <div className="nav-bottom">
        
        <button className="nav-link signout">
          Sign Out
        </button>
      </div>
    </nav>
  );
}
