import React from 'react';

function TopBar({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between p-4 text-white">
      {/* Sidebar Toggle Icon */}
      <div onClick={toggleSidebar} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>

      {/* Bold Text */}
      <div className="text-lg font-bold">
        میزیتو
      </div>
    </div>
  );
}

export default TopBar;
