import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="w-full">
      <nav className="w-full">
        <div className="w-full h-14 flex flex-col justify-center items-center bg-gradient-to-r from-purple-800 to-indigo-900 text-white tracking-widest font-semibold">
          <ul className="flex space-x-1">
            <NavLink to="/">
              <li className="px-4 py-2 hover:text-fuchsia-200">Add user</li>
            </NavLink>
            <NavLink to="streamer_list">
              <li className="px-4 py-2 hover:text-fuchsia-200">User list</li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
