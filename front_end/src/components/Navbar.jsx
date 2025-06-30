import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({setQuery}) => {
  const { user , logout } = useAuth();

  return (
    <nav className="bg-yellow-500 p-4 text-black flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Note App</Link>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 rounded"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-teal-500 px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-pink-500 px-4 py-2 rounded mr-4"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user.name}</span>
            <button className="bg-red-800 px-4 py-2 rounded" onClick={logout} >Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
