"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApis } from "@/services/api/categories/categories";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
}

export function CategoryFormModal({ open, onOpenChange, category }: CategoryFormModalProps) {
  const [name, setName] = useState(category?.name ?? "");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditMode = !!category;

  const createMutation = useMutation({
    mutationFn: categoryApis.mutations.create.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryApis.queries.getAll.queryKey });
      toast({
        title: "Success",
        description: `Category created successfully`,
      });
      onOpenChange(false);
      setName("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to create category`,
        variant: "destructive",
      });
    },
  })

  const updateMutation = useMutation({
    mutationFn: categoryApis.mutations.update.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryApis.queries.getAll.queryKey });
      toast({
        title: "Success",
        description: `Category updated successfully`,
      });
      onOpenChange(false);
      setName("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to update category`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    if (isEditMode && category) {
      updateMutation.mutate({ id: category.id, updates: { name } });
    } else {
      createMutation.mutate({ name });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <FolderPlus className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl text-center">
            {isEditMode ? "Edit Category" : "Create New Category"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isEditMode
              ? "Update your category details"
              : "Organize your learning resources by creating categories"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g., Web Development"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}