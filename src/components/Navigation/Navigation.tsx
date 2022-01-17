import React from "react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 bottom-0 bg-blueExtend w-full sm:w-1/6 md:w-1/6 lg:w-1/6 h-6/8 p-4">
      <ul className="mt-16 text-white">
        <li>Tickets</li>
        <li>Users</li>
        <li>Analytics</li>
      </ul>
    </nav>
  );
};

export default Navigation;
