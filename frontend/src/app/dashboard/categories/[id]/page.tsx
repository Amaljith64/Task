"use client";

import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react";
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

export default function CategoryPage({ params }: { params: { id: string } }) {

  const { data:category,error }= useQuery(resourceApis.queries.getById(5))

  console.log(error,'ssssssssssssssssssssdata');
  // This would be fetched from the API based on the category ID


  const progress = 60


  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/categories">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{category?.name}</h2>
        </div>
        <Link href={`/dashboard/resources/new?category=${category?.id}`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Resource
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{category?.total_resources}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{category?.completed_resources}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{category?.total_time_spent}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>Track your learning progress in this category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
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
          <ResourceList />
        </CardContent>
      </Card>
    </div>
  );
}