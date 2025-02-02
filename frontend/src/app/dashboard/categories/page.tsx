"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryApis } from "@/services/api/categories/categories";
import { Category } from "@/types/category";
import { CategoryFormModal } from "@/components/dashboard/categories/category-form-modal";
import CategoryListCard from "@/components/dashboard/categories/category-list-card";

export default function CategoriesPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const queryClient = useQueryClient();

  const { data: categories, isLoading, error } = useQuery(categoryApis.queries.getAll);

  const mutation = useMutation({
    mutationFn: categoryApis.mutations.delete.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryApis.queries.getAll.queryKey,
      });
    },
    onError: (error) => {
      console.error('Failed to delete category:', error);
    }
  });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  console.log(error);

  // if (isLoading) return <div>loading...</div>;
  // if (error) return <div>Error loading categories</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Organize your learning resources
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedCategory(undefined);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories && !isLoading &&
          categories.map((category) => (
            <CategoryListCard
              category={category}
              key={category.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
      </div>
      <CategoryFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={selectedCategory}
      />
    </div>
  );
}
