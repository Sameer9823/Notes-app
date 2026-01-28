import { read } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const currentTime = new Date()

    return NextResponse.json({ 
        time: currentTime.toISOString(),
        readable: currentTime.toLocaleTimeString(),
        unix: currentTime.getTime(),
        utc: currentTime.toUTCString(),
        message: "Current server time fetched successfully",
        requestId: Math.random().toString(36).substring(2, 15) 
    });
}