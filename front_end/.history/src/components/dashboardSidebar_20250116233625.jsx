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
        <div className="w-64 bg-white shadow-md p-4">
           <SidebarItem 
    icon={
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
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
    onClick={() => console.log('Navigate to Dashboard')} 
/>
<hr className="w-full border-gray-200 mt-2" />
            <SidebarItem 
                icon={<i className="fas fa-comments" />} 
                label="گفتگو" 
                notificationCount={1} 
                onClick={() => handleNavigation('/conversations')} 
            />
            <SidebarItem 
                icon={<i className="fas fa-folder-open" />} 
                label="پروژه‌ها" 
                notificationCount={0} 
                onClick={() => handleNavigation('/projects')} 
            />
            <SidebarItem 
                icon={<i className="fas fa-tasks" />} 
                label="وظایف" 
                notificationCount={4} 
                onClick={() => handleNavigation('/tasks')} 
            />
            <SidebarItem 
                icon={<i className="fas fa-envelope" />} 
                label="نامه‌ها" 
                notificationCount={1} 
                onClick={() => handleNavigation('/letters')} 
            />
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
