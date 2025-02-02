"use client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resourceApis } from "@/services/api/resources/resources";
import { useToast } from "@/hooks/use-toast";
import { Resource } from "@/types/resource";
import { useState } from "react";
import ResourceEditFormModal from "./resource-edit-form-modal";
import { Category } from "@/types/category";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

interface ResourceListProps {
  resourData: Resource[];
  actionDisabled?: boolean;
  isEdit?: boolean;
  categories?: Category[];
}

export function ResourceList({
  resourData,
  actionDisabled = false,
  categories,
  isEdit = true,
}: ResourceListProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, SetselectedResource] = useState<Resource | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: resourceApis.mutations.delete.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceApis.queries.getAll.queryKey })
      if (id) {
      queryClient.invalidateQueries({ queryKey: resourceApis.queries.getById(Number(id)).queryKey })
      }
      toast({
        title: "Success",
        description: " Resource deleted",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete resource",
        variant: "destructive",
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: resourceApis.mutations.updateStatus.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceApis.queries.getAll.queryKey })
      if (id) {
        queryClient.invalidateQueries({ queryKey: resourceApis.queries.getById(Number(id)).queryKey })
        }
      toast({
        title: "Success",
        description: "Resource marked as complete",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update resource",
        variant: "destructive",
      });
    },
  });

  const handleMarkComplete = (resource: Resource) => {
    completeMutation.mutate({
      id: resource.id,
      updates: {
        completion_status: true,
      },
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead
              className={cn("w-[50px]", actionDisabled && "hidden")}
            ></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resourData?.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{resource.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{resource.category_name}</Badge>
              </TableCell>
              <TableCell>
                {resource.completion_status ? (
                  <div className="flex items-center space-x-2 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <Clock className="h-4 w-4" />
                    <span>In Progress</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(resource?.created_at), "MMM dd, yyyy")}{" "}
              </TableCell>
              <TableCell className={cn("", actionDisabled && "hidden")}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className={cn("", actionDisabled && "hidden")}
                  >
                    <Button
                      disabled={actionDisabled}
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => SetselectedResource(resource)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={() => handleMarkComplete(resource)}
                      disabled={resource.completion_status}
                    >
                      Mark as complete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setIsModalOpen(true);
                        SetselectedResource(resource);
                      }}
                      className={cn("", !isEdit && "hidden")}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => mutation.mutate(resource.id)}
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ResourceEditFormModal
        open={isModalOpen}
        onOpenChange={(open: boolean) => {
          setIsModalOpen(open);
          if (!open) {
            SetselectedResource(null);
          }
        }}
        categories={categories ?? []}
        resource={selectedResource!}
      />
    </div>
  );
}
