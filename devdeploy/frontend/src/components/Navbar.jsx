import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-500">
        DevDeploy
      </h1>

      <div className="flex gap-6 text-lg">

        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="hover:text-blue-400 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="hover:text-blue-400 transition"
        >
          Signup
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-blue-400 transition"
        >
          Dashboard
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;