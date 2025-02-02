import serverAxiosInstance from "@/config/server-axios-instance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    
    try {
        const body = await request.json();
        const response = await serverAxiosInstance.post("/auth/login/", body);
        const redirectResponse = NextResponse.redirect(new URL("/dashboard", "http://localhost:3001"));
        const backendCookies = response.headers['set-cookie'];

        if (backendCookies) {
            backendCookies.forEach((cookie: string) => {
                redirectResponse.headers.append('Set-Cookie', cookie);
            });
        }

        return redirectResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.non_field_errors?.[0] || 
                               error.response?.data?.detail ||
                               error.message;
            
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
