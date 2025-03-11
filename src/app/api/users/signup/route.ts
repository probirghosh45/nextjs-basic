import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Field-wise validation
    if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });
    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });
    if (!password) return NextResponse.json({ message: "Password is required" }, { status: 400 });
    if (!confirmPassword) return NextResponse.json({ message: "Confirm Password is required" }, { status: 400 });
    if (password !== confirmPassword) return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Check if user is successfully created
    if (!newUser) {
      return NextResponse.json({ message: "User creation failed" }, { status: 500 });
    }

    // Prepare token data
    const tokenData = {
      id: newUser._id.toString(),
      username: newUser.name,
      email: newUser.email,
    };

    // Generate JWT token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, { expiresIn: "1d" });

    // Create response
    const response = NextResponse.json({ message: "User Created Successfully" }, { status: 200 });

    // Set token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
      // path: "/",
    });

    return response;
  } catch (error) {
    console.error("🚨 Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
