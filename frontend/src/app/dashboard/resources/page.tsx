"use client";

import ResourceFormModal from "@/components/dashboard/resources/resource-form-modal";
import { ResourceList } from "@/components/dashboard/resources/resource-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categoryApis } from "@/services/api/categories/categories";
import { resourceApis } from "@/services/api/resources/resources";
import { useQuery } from "@tanstack/react-query";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: resourseData, isLoading } = useQuery(resourceApis.queries.getAll)
  const { data: categories } = useQuery(categoryApis.queries.getAll);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className={cn("", categories?.length === 0 && "hidden")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Resource
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        categories?.length === 0 ? (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Create a Category First</h2>
            <p className="text-muted-foreground">You need to create at least one category before adding resources</p>
          </div>
        ) : (resourseData?.length ?? 0) > 0 ? (
          <ResourceList resourData={resourseData ?? []} categories={categories ?? []} />
        ) : (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Your Resource Library is Empty</h2>
            <p className="text-muted-foreground">Click the Add Resource button to begin building your collection</p>
          </div>
        )
      )}

      <ResourceFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        categories={categories}
      />
    </div>
  );
}