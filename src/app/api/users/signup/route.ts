import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Field-wise validation
    if (!name) {
      console.log("❌ Name is required");
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    if (!email) {
      console.log("❌ Email is required");
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    if (!password) {
      console.log("❌ Password is required");
      return NextResponse.json({ message: "Password is required" }, { status: 400 });
    }
    if (!confirmPassword) {
      console.log("❌ Confirm Password is required");
      return NextResponse.json({ message: "Confirm Password is required" }, { status: 400 });
    }
    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match");
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    // user exist or not check
    const user = await User.findOne({ email });
    if (user) {
      console.log("❌ User already exists");
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Password hashing
    const hashPassword = async (password: string) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    }

   const hashedPassword = await hashPassword(password)

    // save to database
    const data = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return NextResponse.json({ message: "User Created Successfully" }, { status: 200 });

  } catch (error) {
    console.error("🚨 Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
