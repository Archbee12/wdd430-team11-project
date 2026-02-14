import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  return (
    <nav className="sidenav">
      {/* <Link href="/" className="sidenav-logo">
        Haven Handcraft
      </Link> */}

      <NavLinks />      
    </nav>
  );
}
