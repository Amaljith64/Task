"use client";

import { Progress } from "@/components/ui/progress";

// const categories = [
//   { name: "Programming", progress: 75 },
//   { name: "Design", progress: 45 },
//   { name: "Business", progress: 30 },
//   { name: "Other", progress: 20 },
// ];

export function CategoryProgress({categories}) {
  console.log(categories,'[[[[[[[[[[[[');
  return (
    <div className="space-y-8">
      {Object?.entries(categories).map(([name, data]) => (
      <div key={name} className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-sm text-muted-foreground">
            {data.completion_percentage}%
          </span>
        </div>
        <Progress value={data.completion_percentage} />
      </div>
    ))}
    </div>
  );
}