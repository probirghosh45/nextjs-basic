import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';


connect();

// Password verification function
const comparePassword = async (plainPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  };

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
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
