// export default function LoginPage() {
//   return (
//     <div>
//       <h1>Login Page</h1>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

const [user, setUser] = useState({
    
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("name", user.name);
    // console.log("email", user.email);
    // console.log("password", user.password);

    if (!user.email || !user.password ) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Login successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
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
              onChange={(e) => setUser({...user, password : e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
