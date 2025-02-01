import axiosInstance from '@/config/axios-instance';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data } = await axiosInstance.post("/auth/register/", body)
    return NextResponse.json({ message: 'Su', data: data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}