import { CategoryProgress } from "@/components/dashboard/categories/category-progress";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ResourceList } from "@/components/dashboard/resources/resource-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import serverAxiosInstance from "@/config/server-axios-instance";
import { DashboardData } from "@/types/dashboard";
import { BookOpen, Clock, ListChecks } from "lucide-react";

const defaultSummaryData: DashboardData = {
  total_resources: 0,
  total_completed: 0,
  total_time_spent: 0,
  category_breakdown: [],
  resource_breakdown: []
};


export default async function Home() {
  const { data: summaryData = defaultSummaryData } = await serverAxiosInstance.get<DashboardData>("/resource/resources/summary/");
  const hideSkeleton = summaryData?.total_resources === 0;
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
      {
        !hideSkeleton ?
          (<>
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
          </>

          ) :

          <div className="text-center space-y-2">
            <h2 className="text-center text-2xl font-bold">Get Started by Adding Categories and Resources</h2>
          </div>
      }
    </div>
  );
}
