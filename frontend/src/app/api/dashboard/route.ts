import { NextResponse } from 'next/server';
import { DashboardData } from '@/types/dashboard';
import serverAxiosInstance from '@/config/server-axios-instance';


export async function GET() {
  try {
    const { data } = await serverAxiosInstance.get<DashboardData>("/api-resource/resources/summary/");


    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';


    
    return NextResponse.json(
      { message: `Logout failed: ${errorMessage}` },
      { status: 500}
  );
  }
}