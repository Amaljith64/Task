'use server'
import { CategoryProgress } from "@/components/dashboard/categories/category-progress";
import { RecentResources } from "@/components/dashboard/resources/recent-resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/config/axios-instance";
import axios from "axios";
import { BookOpen, Clock, ListChecks, LucideIcon } from "lucide-react";
import { cookies } from 'next/headers'

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}



// async function getSummaryData() {
//   const cookieStore = await cookies()

//   const accessToken = cookieStore.get('access_token')?.value;
//   console.log(cookieStore, accessToken, 'cookieStore');
//   try {
//     const response = await axiosInstance.get('/api/resourcess/summary/');
//     console.log(response, 'form summary');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching summary data:', error);
//     throw new Error('Failed to fetch summary data');
//   }

//   // try {
//   //   // const response = await axios.post("auth/login/", credentials)

//   //   // return response.data
//   //   const { data } = await axios.post("api/resources/summary", {
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },

//   //   });
//   //   return data

//   // }
//   // catch (error) {
//   //   throw new Error(`${error}`);
//   // }
// }


function DashboardCard({ title, value, icon: Icon }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default async function Home() {
  // const summaryData = await getSummaryData();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <DashboardCard
          title="Total Resources"
          value={summaryData?.total_resources}
          icon={BookOpen}
        />
        <DashboardCard
          title="Completed"
          value={summaryData?.completed_resources}
          icon={ListChecks}
        />
        <DashboardCard
          title="Time Spent"
          value={`${summaryData?.total_time_spent} Min`}
          icon={Clock}
        /> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <CategoryProgress categories={summaryData?.category_breakdown} /> */}
          </CardContent>
        </Card>
      </div>
      <RecentResources />
    </div>
  );
}