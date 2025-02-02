"use client";

import { Progress } from "@/components/ui/progress";

import { CategoryBreakdown } from "@/types/dashboard";

interface CategoryProgressProps {
  categories: CategoryBreakdown[];
}


export function CategoryProgress({ categories }: CategoryProgressProps) {

  return (
    <div className="space-y-8">
      {categories.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">
            {Math.floor(item.completion_percentage)}%
            </span>
          </div>
          <Progress value={Math.floor(item.completion_percentage)} />
        </div>
      ))}
    </div>
  );
}