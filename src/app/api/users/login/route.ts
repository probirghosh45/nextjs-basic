import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

// Password verification function
async function comparePassword(plainPassword: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email) {
        // console.log("❌ Email is required");
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
      }
    if (!password) {
        // console.log("❌ Password is required");
        return NextResponse.json({ message: "Password is required" }, { status: 400 });
      }  


      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      else{
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
          return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }                                                                                                                               
      }

    
      const response = NextResponse.json({ message: "Login successful" });

          // toked data 
    const tokenData = {
      id : user._id,
      username : user.username,
      email : user.email,
    }

    const token = jwt.sign(tokenData,process.env.JWT_SECRET_TOKEN,{expiresIn: "1d"})
    response.cookies.set("token",token,{
      httpOnly:true,
      secure:true,
      sameSite:"strict",
      path:"/"});  
    
    return response;
  
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
