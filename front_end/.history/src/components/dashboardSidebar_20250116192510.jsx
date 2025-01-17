import React from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarItem({ icon, label, notificationCount, onClick }) {
    return (
        <div 
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
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
            <h2 className="text-gray-800 text-lg font-bold mb-4">داشبورد</h2>
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
