"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your profile! Manage your account settings and details here.
        </p>
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
