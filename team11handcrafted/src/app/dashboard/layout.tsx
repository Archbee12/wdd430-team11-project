import SideNav from "@/app/ui/dashboard/sidenav";
import Footer from "@/app/ui/dashboard/footer";
import Header from "@/app/ui/dashboard/header";
import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="dashboard-layout">
      <Header user={user} />

      <div className="dashboard-main">
        <SideNav />
      
        <div className="dashboard-right">
          <div className="dashboard-content">
            <main className="dashboard-page">
              {children}
            </main>
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}
