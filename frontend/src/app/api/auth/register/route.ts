import serverAxiosInstance from '@/config/server-axios-instance';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data } = await serverAxiosInstance.post("/auth/register/", body)
    return NextResponse.json({ message: 'Su', data: data }, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data

      return NextResponse.json(
        { message: errorMessage },
        { status: error.response?.status || 400 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}