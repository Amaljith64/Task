import axiosInstance from "@/config/axios-instance";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const { data } = await axiosInstance.post("/auth/logout/");

        return NextResponse.json(
            { message: "Logged out successfully", data: data },
            { status: 200 }
        );
    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { message: `Logout failed: ${errorMessage}` },
            { status: 500}
        );
    }
}
