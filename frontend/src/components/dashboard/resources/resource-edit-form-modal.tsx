import { Category } from "@/types/category";
import { Resource } from "@/types/resource";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { resourceApis } from "@/services/api/resources/resources";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema } from "@/schema/resource";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { FilePenLine } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type FormSchema = z.infer<typeof resourceSchema>;

interface ResourceEditFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  resource: Resource;
}

const getCategoryId = (categoryName: string, categories: Category[]) => {
  const category = categories?.find((cat) => cat.name === categoryName);
  return category?.id.toString() ?? "";
};
const ResourceEditFormModal = ({
  onOpenChange,
  open,
  resource,
  categories,
}: ResourceEditFormModalProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  console.log(categories, "categories");
  const mutation = useMutation({
    mutationFn: resourceApis.mutations.update.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceApis.queries.getAll.queryKey,
      });
      toast({
        title: "Success",
        description: `${resource.title} Resource Edited successfully`,
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(resourceSchema),
  });

  useEffect(() => {
    if (resource) {
      reset({
        category: getCategoryId(resource.category_name, categories),
        description: resource.description,
        title: resource.title,
        type: resource.type as "ARTICLE" | "VIDEO" | "QUIZ",
      });
    }
  }, [resource, reset]);

  const onSubmit = (data: FormSchema) => {
    const updateResource = { id: resource.id, updates: { ...data } };
    mutation.mutate(updateResource);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <FilePenLine className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center">
              Edit {resource?.title} Resource
            </DialogTitle>
            <DialogDescription className="text-center">
              Edit details about your {resource?.title} resource
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Advanced React Patterns"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-red-600">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ARTICLE">Article</SelectItem>
                        <SelectItem value="VIDEO">Video</SelectItem>
                        <SelectItem value="QUIZ">Quiz</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <span className="text-sm text-red-600">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={`${field.value}`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={`${category.id}`}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <span className="text-sm text-red-600">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What will you learn from this resource?"
                {...register("description")}
                className="min-h-[100px]"
              />
              {errors.description && (
                <span className="text-sm text-red-600">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Resource</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceEditFormModal;
