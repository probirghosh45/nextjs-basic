import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request : NextRequest){
    try {
        const userData = getDataFromToken(request);
        console.log("🙋‍♂️ chekcing user data", userData);
        if(!userData) return new Response("Unauthorized", {status: 401});
        if (typeof userData !== 'string' && 'id' in userData) {
            const user = await User.findOne({_id: userData.id}).select("-password");
            return NextResponse.json({
                success: true,
                message: "User data found!",
                data: user
            })
        } else {
            return new Response("Invalid token data", {status: 400});
        };
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return new Response(error.message, {status: 500});
        } else {
            console.log("Unknown error", error);
            return new Response("Unknown error occurred", {status: 500});
        }
    }
}