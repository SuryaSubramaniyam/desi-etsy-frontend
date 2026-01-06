import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import API from "../services/api";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // back to landing
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-white shadow-md px-4 py-2 border-b border-gray-100">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/home"
          className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent bg-clip-text"
        >
          DesiEtsy
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2">
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm"
        >
          <input
            type="text"
            placeholder="Search handmade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-44 md:w-64 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-sm font-semibold text-black"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-gray-700">
        <Link className="hover:text-yellow-600 transition" to="/products">
          Products
        </Link>

        {user?.role === "user" && (
          <>
            <Link
              className="relative hover:text-yellow-600 transition"
              to="/cart"
            >
              Cart <CartBadge />
            </Link>
            <Link
              className="hover:text-yellow-600 transition"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </>
        )}

        {user?.role === "artisan" && (
          <Link
            className="hover:text-yellow-600 transition"
            to="/artisan/dashboard"
          >
            Artisan Dashboard
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            className="hover:text-yellow-600 transition"
            to="/admin/dashboard"
          >
            Admin Panel
          </Link>
        )}

        <Link className="hover:text-yellow-600 transition" to="/about">
          About
        </Link>

        {/* Avatar + Logout */}
        {user && (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full ring-2 ring-yellow-400 shadow">
                  <img
                    src={
                      user?.profileImage ||
                      `https://i.pravatar.cc/150?u=${user?._id}`
                    }
                    alt="user"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-white text-gray-800 rounded-box w-52"
              >
                <li className="font-semibold mb-1">👋 {user?.name}</li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>

            <button
              className="ml-2 btn btn-sm border border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost text-2xl">
          ☰
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu menu-sm mt-3 p-3 shadow-lg bg-white text-gray-800 rounded-box w-56"
        >
          <li>
            <Link to="/products">Products</Link>
          </li>
          {user?.role === "user" && (
            <>
              <li>
                <Link to="/cart">
                  Cart <CartBadge />
                </Link>
              </li>
              <li>
                <Link to="/user/dashboard">Dashboard</Link>
              </li>
            </>
          )}
          {user?.role === "artisan" && (
            <li>
              <Link to="/artisan/dashboard">Artisan Dashboard</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link to="/admin/dashboard">Admin Panel</Link>
            </li>
          )}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const CartBadge = () => {
  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await API.get("/cart");
      return res.data;
    },
    enabled: true,
  });

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalCount === 0) return null;

  return (
    <span className="badge badge-sm badge-primary absolute -top-2 -right-3">
      {totalCount}
    </span>
  );
};

export default Navbar;
