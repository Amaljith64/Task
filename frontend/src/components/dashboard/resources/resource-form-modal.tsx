"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookPlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { resourceSchema } from "@/schema/resource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { resourceApis } from "@/services/api/resources/resources";
import { Category } from "@/types/category";



type FormSchema = z.infer<typeof resourceSchema>

interface ResourceFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories?: Category[];
}

export default function ResourceFormModal({ open, onOpenChange, categories }: ResourceFormModalProps) {

  const queryClient = useQueryClient();
  const { toast } = useToast()


  const mutation = useMutation({
    mutationFn: resourceApis.mutations.create.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceApis.queries.getAll.queryKey })
      toast({
        title: "Success",
        description: `Resource created successfully`,
      })
      onOpenChange(false);
      reset()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: 'destructive'
      })
    }
  })


  const { register, control, handleSubmit, reset, formState: { errors, } } = useForm<FormSchema>({
    resolver: zodResolver(resourceSchema)
  })


  const onSubmit = (data: FormSchema) => {
    mutation.mutate(data)
  }


  return (
    <div className="max-w-2xl mx-auto">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <BookPlus className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center">Add New Resource</DialogTitle>
            <DialogDescription className="text-center">
              Add details about your learning resource
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
              {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
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
                {errors.type && <span className="text-sm text-red-600">{errors.type.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={`${field.value}`}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={`${category.id}`}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}
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
              {errors.description && <span className="text-sm text-red-600">{errors.description.message}</span>}
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => {
                onOpenChange(false)
                reset()
              }}>Cancel</Button>
              <Button type="submit">Save Resource</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div >
  );
}