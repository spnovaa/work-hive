import React from 'react';

function TopBar({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Right-aligned Toggle Button */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 cursor-pointer text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>
        {/* Bold Text */}
        <div className="text-white text-lg font-bold">میزیتو</div>
      </div>
    </div>
  );
}

export default TopBar;
