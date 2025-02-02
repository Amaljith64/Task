import axiosInstance from "@/config/axios-instance";
import {Category, CategoryApis, CreateCategory, UpdateCategory,  } from "@/types/category";

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
  lists: () => [...CATEGORY_KEYS.all, 'list'] as const,
  details: () => [...CATEGORY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...CATEGORY_KEYS.details(), id] as const
} as const;


export const categoryApis: CategoryApis ={
    queries: {
      getAll: {
        queryKey: CATEGORY_KEYS.lists(),
        queryFn: async (): Promise<Category[]> => {
          const response = await axiosInstance.get("/resource/categories/");
          return response.data;
        }
      },
      getById:(id:number) =>( {
        queryKey: CATEGORY_KEYS.detail(id),
        queryFn: async (): Promise<Category> => {
          const response = await axiosInstance.get(`/resource/categories/${id}`);
          return response.data;
        },
      })
    },
    mutations :{
      create:{
          mutationFn: async (data : CreateCategory) : Promise<Category> => {
              const response = await axiosInstance.post("/resource/categories/",data)
              return response.data
          }
      },
      update: {
        mutationFn: async ({id,updates,}: UpdateCategory): Promise<Category> => {
          const response = await axiosInstance.patch(`/resource/categories/${id}/`, updates);
          return response.data;
        },
      },
      delete: {
        mutationFn: async (id: number): Promise<void> => {
          await axiosInstance.delete(`/resource/categories/${id}/`);
        },
      },
    }
}