import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navOpen, setNavOpen] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { cartItems } = useSelector((state) => state.carts);
  const { currentUser } = useSelector((state) => state.auth);

  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/products",
      display: "Products",
    },
    {
      path: "/myorders",
      display: "Orders",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header
      className="py-5 flex items-center border-b border-slate-300"
      ref={headerRef}
    >
      <div className="container ">
        <div className="flex items-center justify-between ">
          

          {/* Navigation */}
          <div className="md:flex hidden items-center gap-5">
            {/* Brand */}
            <div className="flex items-center gap-[60px]">
              <div className="flex">
                <h1 className="font-bold text-[28px] text-yellow-400 ">
                  Grocery
                </h1>
                <h1 className="font-bold text-[28px] text-green-400">It</h1>
              </div>
            </div>
            <ul className="flex items-center  gap-5">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-blue-600 font-[600] text-[20px]"
                        : "font-[500] text-[18px]"
                    }
                    to={item.path}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle Button for Small Screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="text-gray-500 focus:outline-none"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center right gap-4">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.role === "admin" && (
                    <div className="mr-4">
                      <NavLink
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-blue-600 font-[600] text-[20px]"
                            : "font-[500] text-[18px]"
                        }
                        to="/admin"
                      >
                        Admin
                      </NavLink>
                    </div>
                  )}

                  <AiOutlineUser className="w-[34px] h-[34px] border border-slate-400 p-1 rounded-full" />

                  <div className="flex flex-col leading-4">
                    <h1 className="text-[14px] text-gray-500">
                      Hello, {currentUser.name}
                    </h1>
                    <span className="text-[14px] font-[500]">Your Account</span>
                  </div>

                  <div
                    onClick={handleLogout}
                    className="flex items-center border border-slate-400 px-2 py-1 hover:cursor-pointer hover:bg-blue-500 hover:text-white hover:border hover:border-slate-400 rounded-full"
                  >
                    <LuLogOut className="w-[34px] h-[34px] p-1 " />
                    <h1>Logout</h1>
                  </div>

                  <div
                    className="relative gap-5 hover:cursor-pointer"
                    onClick={() => navigate("/carts")}
                  >
                    <AiOutlineShoppingCart className=" w-[28px] h-[28px]" />

                    {cartItems.length > 0 && (
                      <span className="w-[16px] h-[16px] p-2.5 flex items-center justify-center bg-red-600 rounded-full absolute text-white -top-2 -right-2">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AiOutlineUser className="w-[34px] h-[34px] border border-slate-400 p-1 rounded-full" />

                  <div className="flex flex-col leading-4">
                    <h1 className="text-[14px] text-gray-500">Sign In</h1>
                    <span className="text-[14px] font-[500]">Your Account</span>
                  </div>

                  <div
                    onClick={() => navigate("/auth")}
                    className="flex items-center border border-slate-400 px-2 py-1 hover:cursor-pointer hover:bg-blue-500 hover:text-white hover:border hover:border-slate-400 rounded-full"
                  >
                    <LuLogOut className="w-[34px] h-[34px] p-1 " />
                    <h1>LogIn</h1>
                  </div>
                </div>
              )}

              {/* <div className="relative gap-5 hover:cursor-pointer">
              <AiOutlineShoppingCart
                onClick={() => navigate("/carts")}
                className=" w-[28px] h-[28px]"
              />

              {cartItems.length > 0 && (
                <span className="w-[16px] h-[16px] p-2.5 flex items-center justify-center bg-red-600 rounded-full absolute text-white -top-2 -right-2">
                  {cartItems.length}
                </span>
              )}
            </div> */}
            </div>
          </div>
        </div>

        {/* Responsive Navigation for Small Screens */}
        {navOpen && (
          <div className="md:hidden mt-4">
          <div className="flex">
                <h1 className="font-bold text-[28px] text-yellow-400 ">
                  Grocery
                </h1>
                <h1 className="font-bold text-[28px] text-green-400">It</h1>
              </div>
            <ul className="flex flex-col gap-2">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-blue-600 font-[600] text-[20px]"
                        : "font-[500] text-[18px]"
                    }
                    to={item.path}
                    onClick={() => setNavOpen(false)}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
