import NavLinks from '@/app/ui/dashboard/nav-links';
import  { logoutUser } from '@/app/auth';

export default function SideNav() {
  return (
    <nav className="sidenav">
      {/* <Link href="/" className="sidenav-logo">
        Haven Handcraft
      </Link> */}

      <NavLinks />

      <div className="nav-bottom">
        
        <form action={logoutUser} >
          <button type="submit" className="nav-link signout">
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
}
