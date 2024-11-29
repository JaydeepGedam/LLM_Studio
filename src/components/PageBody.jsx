import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";

const PageBody = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-full h-screen flex">
            {/* Sidebar */}
            <div className={`lg:w-[30%] md:w-[45%] w-[80%] h-full bg-zinc-200 py-6 px-9 overflow-y-auto custom-scrollbar fixed lg:static z-10 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Hamburger or Cross Button */}
            <button
                className="lg:hidden fixed flex items-center justify-center top-4 left-4 z-20 bg-red-200 p-2 rounded shadow"
                onClick={toggleSidebar}
            >
                <span className="material-symbols-outlined">
                    {isSidebarOpen ? 'close' : 'menu'}
                </span>
            </button>

            {/* Main Content */}
            <div className="lg:w-[70%] w-full h-full pt-10 pb-10 px-6 flex items-start justify-center overflow-y-auto custom-scrollbar ml-auto">
                {children}
            </div>
        </div>
    );
};

export default PageBody;
