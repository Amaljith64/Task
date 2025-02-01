import axiosInstance from "@/config/axios-instance";
import { CreateResource, ResourceApis,UpdateResource } from "@/types/resource";


export const RESOURCE_KEYS = {
    all: ['resource'] as const,
    lists: () => [...RESOURCE_KEYS.all, 'list'] as const,
    details: () => [...RESOURCE_KEYS.all, 'detail'] as const,
    detail: (id: number) => [...RESOURCE_KEYS.details(), id] as const
  } as const;


export const resourceApis:ResourceApis = {
    queries:{
        getAll:{
            queryKey: RESOURCE_KEYS.lists(),
            queryFn:async()=>{
                const response = await axiosInstance.get('/api/resources/');
                return response.data;
            }
        },
        getById:(id:number) => ({
            queryKey:RESOURCE_KEYS.detail(id),
            queryFn: async() =>{
                const response = await axiosInstance.get(`/api/categories/${id}/summary/`)
                
                return response.data;
            }
        }),
        getSummary:{
            queryKey:['resource','summary'],
            queryFn: async() =>{
                const response = await axiosInstance.get('/api/resources/summary/');
                console.log(response,'form summary');
                return response.data;
            }
        }
    },
    mutations:{
        create:{
            mutationFn:async(data:CreateResource)=>{
                const resource = await axiosInstance.post("/api/resources/",data)
                return resource.data
            }
        },
        update:{
            mutationFn: async ({id,updates}:UpdateResource) =>{
                const response = await axiosInstance.patch(`/api/resources/${id}/`,updates)
                return response.data
            }
        },
        updateStatus:{
            mutationFn: async ({id,updates}:UpdateResource) =>{
                const response = await axiosInstance.post(`/api/resources/${id}/mark_complete/`,updates)
                return response.data
            }
        },
        delete:{
            mutationFn:async (id:number)=>{
                await axiosInstance.delete(`/api/resources/${id}/`)
            }
        }
    }
}