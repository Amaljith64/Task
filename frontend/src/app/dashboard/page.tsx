import { CategoryProgress } from "@/components/dashboard/categories/category-progress";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ResourceList } from "@/components/dashboard/resources/resource-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setServerSideCookies } from "@/config/axios-instance";
import { DashboardData } from "@/types/dashboard";
import { BookOpen, Clock, ListChecks } from "lucide-react";
import { cookies } from "next/headers";

const defaultSummaryData: DashboardData = {
  total_resources: 0,
  total_completed: 0,
  total_time_spent: 0,
  category_breakdown: [],
  resource_breakdown: []
};

async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const cookieStore = await cookies();
    setServerSideCookies(cookieStore.toString());

    const response = await fetch("http://localhost:3000/api/dashboard/", {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      return defaultSummaryData;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return defaultSummaryData;
  }
}

export default async function Home() {
  const summaryData = await fetchDashboardData();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Resources"
          value={summaryData?.total_resources}
          icon={BookOpen}
        />
        <DashboardCard
          title="Completed"
          value={summaryData?.total_completed}
          icon={ListChecks}
        />
        <DashboardCard
          title="Time Spent"
          value={`${summaryData?.total_time_spent} Min`}
          icon={Clock}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {summaryData?.category_breakdown && (
              <CategoryProgress categories={summaryData?.category_breakdown} />
            )}
          </CardContent>
        </Card>
      </div>
      {summaryData?.resource_breakdown && (
        <ResourceList
          actionDisabled={true}
          resourData={summaryData?.resource_breakdown}
        />
      )}
    </div>
  );
}
