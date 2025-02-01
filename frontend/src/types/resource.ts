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
  name:string
  total_resources: number;
  completed_resources: number;
  completion_percentage: number;
  total_time_spent: number;
  resource_breakdown: Resource[]
}

export interface CreateResource{
  title:string
  description:string
  type:string
  category:number| string

}

export interface UpdateResource{
    id:number;
    updates: Partial<Resource>;
}


export interface ResourceQuerry {
  getAll: UseQueryOptions<Resource[], Error, Resource[]>
  getById:(id:number)=> UseQueryOptions<ResourceSummary, Error, ResourceSummary>
  getSummary: UseQueryOptions<ResourceSummary,Error,ResourceSummary>
}

export interface ResourceMutations {
  create: UseMutationOptions<CreateResource, Error, CreateResource  >
  update: UseMutationOptions<Resource, Error, UpdateResource>
  updateStatus: UseMutationOptions<Resource, Error, UpdateResource>
  delete: UseMutationOptions<void, Error, number>
}


export interface ResourceApis {
  queries: ResourceQuerry,
  mutations: ResourceMutations
}

