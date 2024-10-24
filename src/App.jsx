import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dropdown from "./components/Dropdown";
import { FiChevronDown } from 'react-icons/fi';

function App() {
  return (
    <div className="w-[100%] h-fit flex">
      <div className="w-[30%] h-fit bg-zinc-200 py-6 px-9">
        <Sidebar />
      </div>
      <div className="w-[70%] text-sm h-screen flex items-center justify-center">
        <div className="w-[90%] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
          <h1 className="text-sm">Select the Project</h1>
          <Dropdown bgcolor="#E4E4E7" height="40px" placeholder="Select the Project"/>
          </div>
          <div className="w-[100%] flex gap-6">
            <div className="w-[50%] flex flex-col gap-2">
              <h1 className="">Test Suite Title</h1>
              <input
                className="p-3 bg-[#E4E4E7] border-none outline-none rounded-[6px] w-full h-[40px]"
                type="text"
                placeholder="Enter the test suite name here."
              />
            </div>
            <div className="w-[50%] flex flex-col gap-2">
              <h1 className="">Test Suite Description</h1>
              <input
                className="p-3 bg-[#E4E4E7] border-none outline-none rounded-[6px] w-full h-[40px]"
                type="text"
                placeholder="Enter the test suite information here."
              />
            </div>
          </div>
          <div className="w-[100%] flex gap-6">
            <div className="w-[50%] flex flex-col gap-2">
              <h1 className="">LLM Model/ Deployment Name</h1>
              <input
                className="p-3 bg-[#E4E4E7] border-none outline-none rounded-[6px] w-full h-[40px]"
                type="text"
                placeholder=""
              />
            </div>
            <div className="w-[50%] flex flex-col gap-2">
              <h1 className="">SearchType</h1>
              <Dropdown width="w-[50%]" height="40px" bgcolor="#E4E4E7" placeholder="Select"/>
            </div>
          </div>
          <Dropdown bgcolor="" height="40px" placeholder="System Prompts" />
          <div className="w-[100%] flex gap-6">
            <div className="w-[50%]">
              <Dropdown width="w-[50%]" height="40px" bgcolor="" placeholder="LLM Evaluation Config" />
            </div>
            <div className="w-[50%]">
              <Dropdown width="w-[50%]" height="40px" bgcolor="" placeholder="Select Evaluation Config" />
            </div>
          </div>
          <button className="w-fit text-base rounded-md px-4 py-2 border border-zinc-400">Create Test Suite</button>
        </div>
      </div>
    </div>
  );
}

export default App;
