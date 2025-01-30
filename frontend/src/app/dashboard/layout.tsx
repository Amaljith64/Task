import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { UserNav } from "@/components/dashboard/user-nav";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Learning Tracker</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}