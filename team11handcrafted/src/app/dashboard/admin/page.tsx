import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage products, artisans, buyers.</p>
    </div>
  );
}
