import axiosInstance from '@/config/axios-instance';
import { NextResponse } from 'next/server';
import { DashboardData } from '@/types/dashboard';

export async function GET() {
  try {
    const { data } = await axiosInstance.get<DashboardData>("/api/resources/summary/");
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json(
      { message: `Logout failed: ${errorMessage}` },
      { status: 500}
  );
  }
}