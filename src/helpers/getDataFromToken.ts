import jwt  from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromToken = (request : NextRequest)=>{
   try {
    const token = request.cookies.get("token")?.value || "";
    if(!token) return null;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN!); 
    return decodedToken;
   } catch (error) {
       if (error instanceof Error) {
           console.log(error);
           throw new Error(error.message);
       } else {
           console.log("Unknown error", error);
           throw new Error("Unknown error occurred");
       }
   }
}