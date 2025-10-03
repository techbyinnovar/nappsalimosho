// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <h1>Welcome, {session.user?.email}</h1>
      <button onClick={() => signOut()}>Logout</button>

      <Link
        href="/admin/schools"
        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        View Registered Schools
      </Link>
    </div>
  );
}
