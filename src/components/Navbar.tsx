"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  console.log("🙋‍♂️ user", user);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/user-data", {
          withCredentials: true,
        });
        console.log("🙋‍♂️ check response", response?.data?.data);
        setUser(response?.data?.data);
      } catch (error) {
        if ((error as any).response?.status === 401) {
          console.warn("User is not authenticated. Redirecting to login...");
          setUser(null);
          // router.push("/login");
        } else {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true }); // ✅ `withCredentials` পাঠাচ্ছি
      setUser(null); // ✅ ইউজার স্টেট মুছছি
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>

        {!user ? (
          <li>
            <Link href="/login" className="text-white hover:text-gray-400">
              Login
            </Link>
          </li>
        ) : (
          <>
            <li className="text-white">{user.name}</li>
            <li className="text-gray-400">{user.email}</li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-400"
              >
                Logout
              </button>
            </li>
          </>
        )}

        <li>
          <Link href="/profile" className="text-white hover:text-gray-400">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
