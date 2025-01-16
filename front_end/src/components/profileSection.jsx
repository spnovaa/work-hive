import React from 'react';

const ProfileSection = ({ name, greeting, date }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md max-w-xs">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="bg-gray-300 w-24 h-24 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-4.418 0-8 1.79-8 4m8-4c4.418 0 8 1.79 8 4m-8-4v4"
            />
          </svg>
        </div>

        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-700">{name}</h2>

        {/* Greeting */}
        <p className="text-sm text-gray-600 mt-1">{greeting}</p>

        {/* Date */}
        <p className="text-sm text-gray-500 mt-1">{date}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
