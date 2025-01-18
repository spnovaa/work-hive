import React from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarItem({ icon, label, notificationCount, onClick }) {
    return (
        <div 
            className="className=flex items-center justify-start flex-row-reverse p-4 cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <div className="flex items-center">
                <span className="text-lg text-gray-700 mr-2">{icon}</span>
                <span className="text-gray-700 text-sm font-medium">{label}</span>
            </div>
            {notificationCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {notificationCount}
                </span>
            )}
        </div>
    );
}

function DashboardSidebar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 bg-gray-100 text-white shadow-md p-0 rtl" dir="rtl" > 
            <SidebarItem 
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 9.75L12 3l9 6.75v9.75A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 19.5V9.75z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 21V12h6v9"
                        />
                    </svg>
                } 
                label="داشبورد"
                onClick={() => handleNavigation('/')}
            />
            <hr className="w-full border-gray-200 mt-2" />
            <SidebarItem 
               icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-5.586a1 1 0 00-.707.293l-2.707 2.707A1 1 0 0110 23V20H7a2 2 0 01-2-2V10a2 2 0 012-2h2"
                  />
                </svg>
              }
                label="گفتگو" 
                notificationCount={1} 
                onClick={() => handleNavigation('/conversations')} 
            />
              <hr className="w-full border-gray-200 mt-2" />
            <SidebarItem 
                icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16v-4m4 4V8m4 8v-2m0 6H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2z"
                      />
                    </svg>
                  }
                label="پروژه‌ها" 
                notificationCount={0} 
                onClick={() => handleNavigation('/projects')} 
            />
              <hr className="w-full border-gray-200 mt-2" />
            <SidebarItem 
                icon={<i className="fas fa-tasks" />} 
                label="وظایف" 
                notificationCount={4} 
                onClick={() => handleNavigation('/tasks')} 
            />
              <hr className="w-full border-gray-200 mt-2" />
            <SidebarItem 
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5V9a2 2 0 00-2-2H4a2 2 0 00-2 2v11h5m10-9a3 3 0 11-6 0 3 3 0 016 0zm-6 2a6 6 0 00-12 0v5h12v-5z"
                  />
                </svg>
              }
                label="تیم ها" 
                notificationCount={1} 
                onClick={() => handleNavigation('/teams')} 
            />
              <hr className="w-full border-gray-200 mt-2" />
            <SidebarItem 
                icon={<i className="fas fa-sticky-note" />} 
                label="یادداشت‌های من" 
                notificationCount={0} 
                onClick={() => handleNavigation('/notes')} 
            />
        </div>
    );
}

export default DashboardSidebar;

