"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

const recentResources = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "Article",
    category: "Programming",
    completed: true,
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    type: "Video",
    category: "Design",
    completed: false,
  },
  {
    id: 3,
    title: "Business Strategy Fundamentals",
    type: "Quiz",
    category: "Business",
    completed: false,
  },
];

export function RecentResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Resources</CardTitle>
        <CardDescription>
          Your recently added learning resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentResources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{resource.title}</span>
                  {resource.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary">{resource.type}</Badge>
                  <Badge variant="outline">{resource.category}</Badge>
                </div>
              </div>
              <Button variant="ghost">View Details</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}