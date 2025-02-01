"use client";

import ResourceFormModal from "@/components/dashboard/resources/resource-form-modal.tsx";
import { ResourceList } from "@/components/dashboard/resources/resource-list";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
          <Button onClick={()=> setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Resource
          </Button>
      </div>
      <ResourceList onOpenChange={setIsModalOpen} />
      <ResourceFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}