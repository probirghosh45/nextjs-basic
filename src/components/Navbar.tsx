import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/login" className="text-white hover:text-gray-400">
           Login
          </Link>
        </li>
        <li>
          <Link href="/signup" className="text-white hover:text-gray-400" >
           Sign Up
          </Link>
        </li>
        <li>
          <Link href="/profile" className="text-white hover:text-gray-400" >
           Profile
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
