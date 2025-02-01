"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Folder, MoreVertical, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryApis } from "@/services/api/categories/categories";
import { Category } from "@/types/category";
import { CategoryFormModal } from "@/components/dashboard/categories/category-form-modal";

export default function CategoriesPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery(categoryApis.queries.getAll);
  const mutation = useMutation({mutationFn: categoryApis.mutations.delete.mutationFn,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey:categoryApis.queries.getAll.queryKey})
    }
  },
  )

  if (isLoading) {
    return <div>loading...</div>
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id:number) =>{
    mutation.mutate(id)

  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Organize your learning resources</p>
        </div>
        <Button onClick={() => {
          setSelectedCategory(undefined);
          setIsModalOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories && categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">
                <div className="flex items-center space-x-2">
                  <Folder className="h-5 w-5 text-primary" />
                  <span>{category.name}</span>
                </div>
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => handleEdit(category)} >Edit</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleDelete(category.id)} className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {category.resourceCount} resources
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {category.completedCount} completed
                  </p>
                </div>
                <Link href={`/dashboard/categories/${category.id}`}>
                  <Button variant="outline" size="sm">
                    View Resources <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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