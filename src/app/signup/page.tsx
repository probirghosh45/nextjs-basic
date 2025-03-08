
"use client";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function SignupPage() {


  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
   
    try {
      console.log("user", user);
      const response = await axios.post("/api/users/signup", user);
      console.log("✅ response", response.data);
      toast.success("Signup successful!");
      router.push('/')
    } catch (error) {
      console.log("❌ Something went wrong");
    
      if (axios.isAxiosError(error)) {
        console.log("🚨 Axios error response:", error.response?.data);
        console.warn(`⚠️: ${error.response?.data?.message || "Something went wrong"}`);
        toast.error(error.response?.data?.message || "Signup failed!");
      } else {
        console.log("Unknown error", error);
        toast.error("An unknown error occurred!");
      }
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="name"
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
