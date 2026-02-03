import SideNav from '@/app/ui/dashboard/sidenav';
import Footer from '@/app/ui/dashboard/footer';
import Header from '../ui/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Header />

      <div className="dashboard-main">
        <SideNav />

        <main className="dashboard-content">
          {children}
          <Footer />
        </main>
      </div>

    </div>
  );
}
