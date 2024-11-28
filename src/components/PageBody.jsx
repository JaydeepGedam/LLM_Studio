import React from 'react'
import Sidebar from "../components/Sidebar";

const PageBody = ({ children }) => {
    return (
        <div className="w-full h-screen flex">
          {/* Sidebar */}
          <div className="hidden w-[0%] md:block md:w-[30%] h-full bg-zinc-200 py-6 px-9 overflow-y-auto custom-scrollbar">
            <Sidebar />
          </div>
          {/* Main Content */}
          <div className="w-[100%] md:w-[70%] h-full pt-10 pb-10 px-6 flex items-start justify-center overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      );
}

export default PageBody;
