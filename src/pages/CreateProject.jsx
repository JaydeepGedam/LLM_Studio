import React from "react";
// import "./App.css";
import Sidebar from "../components/Sidebar";
import Dropdown from "../components/Dropdown";
import { FiChevronDown } from 'react-icons/fi';

const CreateProject = () => {
  return (
    <div className="w-[100%] h-fit flex">
      <div className="w-[30%] h-fit bg-zinc-200 py-6 px-9">
        <Sidebar />
      </div>
      <div className="w-[70%] text-sm h-screen flex items-center justify-center">
        <div className="w-[80%] flex flex-col gap-6">
          <h1 className="text-4xl font-bold">Create Your Project</h1>
          <div className="flex flex-col gap-2">
              <h1 className="">Project Title</h1>
              <input
                className="p-3 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-full h-[40px]"
                type="text"
                placeholder="Enter project name here"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="">Project Description</h1>
              <input
                className="p-3 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-full h-[40px]"
                type="text"
                placeholder="Enter project information here"
              />
            </div>
            <div className="flex flex-col gap-2">
          <h1 className="text-sm">Project LLM Evaluation Model</h1>
          <Dropdown bgcolor="#F0F2F6" height="40px" placeholder="Select"/>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
            <button className="w-fit text-base rounded-md px-4 py-2 border border-[#D5D6D8]">Add Filter Parameter</button>
            <button className="w-fit text-base rounded-md px-4 py-2 border border-[#D5D6D8]">Reset Filter Parameter</button>
          </div>
          <button className="w-fit text-base rounded-md px-4 py-2 border border-[#D5D6D8]">Create Project</button>
          
            </div>
          </div>
      </div>
    </div>
  )
}

export default CreateProject