import { Resource } from "./resource";

export interface DashboardData {
    total_resources: number;
    total_completed: number;
    total_time_spent: number;
    category_breakdown: CategoryBreakdown[];
    resource_breakdown: Resource[];
  }
  
  export interface CategoryBreakdown {
    id:number
    name: string;
    completion_percentage: number;
  }
  