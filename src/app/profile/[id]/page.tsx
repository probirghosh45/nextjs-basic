"use client"; 

import { useRouter } from "next/navigation";
import { use } from "react";

interface UserProfileParams {
  id: string;
}

export default function UserProfile({ params }: { params: Promise<{ id?: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);

  const isValidId = unwrappedParams?.id && !isNaN(Number(unwrappedParams.id));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {isValidId ? `Profile Page No. ${unwrappedParams.id}` : "Invalid Profile"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isValidId
            ? "Welcome to the profile page."
            : "The profile ID is invalid."}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
