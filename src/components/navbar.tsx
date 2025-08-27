import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-transparent w-full text-black py-1.5 fixed top-0 left-0 z-50">
      <ul className="flex items-center justify-between px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg mx-2 my-2">
        <li>Home</li>
        <span className="flex gap-4">
          <li>Github</li>
          <li>Star us</li>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
