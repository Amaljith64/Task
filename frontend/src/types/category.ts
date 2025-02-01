import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export interface Category {
    id:number;
    name:string;
    resourceCount?: number;
    completedCount?: number;
    created_by: number;
    created_at:string;
}

export interface CreateCategory {
    name:string;
}

export interface UpdateCategory{
    id:number;
    updates: Partial<CreateCategory>;
}

export interface CategoryMutations {
    create: UseMutationOptions<Category, Error, CreateCategory>
    update: UseMutationOptions<Category, Error, UpdateCategory>
    delete: UseMutationOptions<void, Error, number>
  }

// UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>

export interface CategoryQuerry {
    getAll:UseQueryOptions<Category[],Error,Category[]>
    getById:(id:number)=> UseQueryOptions<Category, Error, Category>
}

export interface CategoryApis {
    mutations: CategoryMutations
    queries: CategoryQuerry
}