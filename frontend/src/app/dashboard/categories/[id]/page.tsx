"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResourceList } from "@/components/dashboard/resources/resource-list";
import { useQuery } from "@tanstack/react-query";
import { resourceApis } from "@/services/api/resources/resources";
import { use } from "react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    data: category,
    isLoading,
    error,
  } = useQuery(resourceApis.queries.getById(Number(id)));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/categories">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {category?.name}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Total Resources"
          icon={BookOpen}
          value={category?.total_resources ?? 0}
        />
        <DashboardCard
          title="Completed"
          icon={CheckCircle}
          value={category?.completed_resources ?? 0}
        />
        <DashboardCard
          title="Time Spent"
          icon={Clock}
          value={category?.total_time_spent ?? 0}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>
            Track your learning progress in this category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(category?.completion_percentage ?? 0)}%
            </span>
          </div>
          <Progress value={category?.completion_percentage} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>All resources in this category</CardDescription>
        </CardHeader>
        <CardContent>
          {category?.resource_breakdown && (
            <ResourceList resourData={category.resource_breakdown} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
