import { NextResponse } from "next/server";

export async function GET(){
    try {
      const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
      response.cookies.set("token", "", {
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
        expires: new Date(0),
    });
    return response;

    } catch (error) {
        console.error("🚨 Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}