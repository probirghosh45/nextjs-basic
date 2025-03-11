"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  console.log("🙋‍♂️ user", user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/user-data", {
          withCredentials: true,
        });
        setUser(response?.data?.data);
      } catch (error) {
        console.error("Fetch user data failed:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
        {user ? (
          <>
            <p className="text-gray-500 mt-2">Name: {user.name}</p>
            <p className="text-gray-500 mt-2">Email: {user.email}</p>
          </>
        ) : (
          <p className="text-gray-500 mt-2">Loading...</p>
        )}
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Edit Profile
        </button>
        <button
          onClick={() => router.back()}
          className="mt-4 ml-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
