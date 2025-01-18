function DashboardSidebar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 bg-gray-800 text-white shadow-md p-4"> {/* Changed bg-gray-200 to bg-gray-800 */}
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
                onClick={() => handleNavigation('/')}
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
                label="تیم ها" 
                notificationCount={1} 
                onClick={() => handleNavigation('/teams')} 
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
