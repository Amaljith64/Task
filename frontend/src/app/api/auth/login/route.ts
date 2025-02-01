import axiosInstance from "@/config/axios-instance";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    const body = await request.json();

    try {
        const response = await axiosInstance.post("/auth/login/", body);

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
        if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
        } else {
            throw new Error("Login failed: An unknown error occurred");
        }
    }
}
