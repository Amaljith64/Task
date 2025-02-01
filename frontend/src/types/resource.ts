import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query"

export interface Resource {
  id:number
  title: string
  description: string
  type:string
  category_name:string
  created_at:string
  completion_status:boolean

}
export interface ResourceSummary {
  total_resources: number;
  completed_resources: number;
  completion_percentage: number;
  total_time_spent: number;
  category_breakdown: {
    [key: string]: {
      total: number;
      completed: number;
      completion_percentage: number;
    }
  }
}

export interface CreateResource{
  title:string
  description:string
  type:string
  category:number

}

export interface UpdateResource{
    id:number;
    updates: Partial<Resource>;
}


export interface ResourceQuerry {
  getAll: UseQueryOptions<Resource[], Error, Resource[]>
  getById:(id:number)=> UseQueryOptions<Resource, Error, Resource>
  getSummary: UseQueryOptions<ResourceSummary,Error,ResourceSummary>
}

export interface ResourceMutations {
  create: UseMutationOptions<CreateResource, Error, CreateResource  >
  update: UseMutationOptions<Resource, Error, UpdateResource>
  delete: UseMutationOptions<void, Error, number>
}


export interface ResourceApis {
  queries: ResourceQuerry,
  mutations: ResourceMutations
}

