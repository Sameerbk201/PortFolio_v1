import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to={"/"}
        className={
          "w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
        }
      >
        <p className="blue-gradient_text">SK</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "text-[#b54b9f]" : "text-[#70d8bd]")}
        >
          About
        </NavLink>
        <NavLink
          to={"/projects"}
          className={({ isActive }) => (isActive ? "text-[#b54b9f]" : "text-[#70d8bd]")}
        >
          Projects
        </NavLink>
        {/* <NavLink
          to={"/island"}
          className={({ isActive }) => (isActive ? "text-[#b54b9f]" : "text-[#70d8bd]")}
        >
          Island
        </NavLink> */}
      </nav>
    </header>
  );
};

export default Navbar;
