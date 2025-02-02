import serverAxiosInstance from "@/config/server-axios-instance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    const body = await request.json();

    try {
        const response = await serverAxiosInstance.post("/auth/login/", body);

        const responseHeaders = new Headers();
        const backendCookies = response.headers['set-cookie'];
        
        if (backendCookies) {
            backendCookies.forEach((cookie: string) => {
                responseHeaders.append('Set-Cookie', cookie);
            });
        }
        return NextResponse.json(
            { message: "Success", data: response.data },
            { 
                status: 200,
                headers: responseHeaders
            }
        );
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
