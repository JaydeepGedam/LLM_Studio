import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import '../../assets/CustomDropdown.css'; // For external styling
import Dropdown from "../../components/Dropdown";
import PageBody from "../../components/PageBody";
import { FiChevronDown } from 'react-icons/fi'; // Importing the dropdown arrow icon
import InputComp from "../../components/InputComp";

const CreateTestSuite = () => {
  const [isSystemPromptDropdownOpen, setIsSystemPromptDropdownOpen] = useState(false);
  const [isLLMDropdownOpen, setIsLLMDropdownOpen] = useState(false); // For LLM Evaluation Config
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false); // For Search Evaluation Config

  const [projects, setProjects] = useState([]); // Projects fetched from API
  const [selectedProject, setSelectedProject] = useState(null); // Selected project ID
  const [projectDetails, setProjectDetails] = useState({}); // Fetched project details
  const [parameters, setParameters] = useState([]); // Parameters for the project
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error messages

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [evalModel, setEvalModel] = useState("");
  const evalModelOptions = ["Azure Open AI", "Phi 3 Model"];
  const paramOptions = ["Integer", "String", "Boolean"];
  
  const searchTypeOptions = ["Single Vector With Keyword", "Multi Vector With Keyword"];
  const systemPromptOptions = ["Prompt 1", "Prompt 2", "Prompt 3"]; // Example prompt options

  // Toggle system prompt dropdown visibility
  const toggleSystemPromptDropdown = () => {
    setIsSystemPromptDropdownOpen(!isSystemPromptDropdownOpen);
  };

  // Toggle LLM Evaluation dropdown
  const toggleLLMDropdown = () => {
    setIsLLMDropdownOpen(!isLLMDropdownOpen);
  };

  // Toggle Search Evaluation dropdown
  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen(!isSearchDropdownOpen);
  };

  return (
    <PageBody>
        <div className="w-[80%] flex flex-col gap-6">
          <h1 className="text-4xl font-bold">Enter Test Suite Data</h1>

          {/* Project Selection */}
          <div className="flex flex-col gap-2">
          <h1>Select the Project</h1>
          <Dropdown
            bgcolor="#F0F2F6"
            height="40px"
            placeholder="Select a Project"
            options={projects.map((project) => project.title)}
            selected={
              projects.find((project) => project.id === selectedProject)?.title ||
              ""
            }
            onChange={(title) =>
              setSelectedProject(
                projects.find((project) => project.title === title)?.id || null
              )
            }
          />
          {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
        </div>

        {/* Test Suite Title and Description */}
        <div className="w-[100%] flex gap-6">
          {/* Test Suite Title */}
          <div className="w-[50%] flex flex-col gap-2">
          <InputComp inputTitle="Test Suite Title *"  projectName={projectName} setProjectName={setProjectName} placeholder="" />
          </div>

          {/* Test Suite Description */}
          <div className="w-[50%] flex flex-col gap-2">
          <InputComp inputTitle="Test Suite Description"  projectName={projectName} setProjectName={setProjectName} placeholder="" />
          </div>
        </div>

        {/* LLM Model and SearchType */}
        <div className="w-[100%] flex gap-6">
          {/* LLM Model */}
          <div className="w-[50%] flex flex-col gap-2">
          <InputComp inputTitle="LLM Model/ Deployment Name"  projectName={projectName} setProjectName={setProjectName} placeholder="" />
          </div>

          {/* Search Type */}
          <div className="w-[50%] flex flex-col gap-2">
              <h1 className="">SearchType</h1>
              <Dropdown width="w-[50%]" height="40px" bgcolor="#F0F2F6" placeholder="Select" options={searchTypeOptions} />
            </div>
        </div>

          {/* System Prompts Section */}
          <div className="w-[100%] flex flex-col gap-2">
            <h1 className="">System Prompts</h1>
            <div className="flex flex-col gap-2">
              <div
                className="dropdown-header w-full h-[40px] p-3 bg-[#F0F2F6] rounded-[6px] cursor-pointer"
                onClick={toggleSystemPromptDropdown}
              >
                <span className="text-sm">Select System Prompt</span>
                <FiChevronDown className={`float-right dropdown-arrow ${isSystemPromptDropdownOpen ? 'rotate' : ''}`} />
              </div>

              {isSystemPromptDropdownOpen && (
                <div className="mt-2 border border-gray-300 p-3 rounded-[6px]">
                  {systemPromptOptions.map((prompt, index) => (
                    <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-200">
                      <h2 className="font-bold">{`Prompt${index + 1}`}</h2>
                      <input
                        type="text"
                        className="w-[35%] p-2 bg-[#F0F2F6] border-none outline-none rounded-[6px]"
                        placeholder="Test Suite System Prompt Title"
                      />
                      <textarea
                        className="w-[45%] p-2 bg-[#F0F2F6] border-none outline-none rounded-[6px]"
                        placeholder="Test Suite System Prompt"
                        rows={1}
                      />
                      <div className="flex items-center">
                        <input type="checkbox" className="cursor-pointer" id={`isActive${index}`} name={`isActive${index}`} />
                        <label htmlFor={`isActive${index}`} className="ml-2">Is Active</label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* LLM Evaluation Config and Search Evaluation Config */}
          <div className="w-[100%] flex gap-6">
            {/* LLM Evaluation Config Dropdown */}
            <div className="w-[50%] flex flex-col gap-2">
              <div className="dropdown-header w-full h-[40px] p-3 bg-[#F0F2F6] rounded-[6px] cursor-pointer" onClick={toggleLLMDropdown}>
                <span className="text-sm">LLM Evaluation Config</span>
                <FiChevronDown className={`float-right dropdown-arrow ${isLLMDropdownOpen ? 'rotate' : ''}`} />
              </div>

              {isLLMDropdownOpen && (
                <div className="mt-2 border border-gray-300 p-3 rounded-[6px]">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Groundedness
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Relevance
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Clarity
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Accuracy
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Completeness
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      LLMOverallScore
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Search Evaluation Config Dropdown */}
            <div className="w-[50%] flex flex-col gap-2">
              <div className="dropdown-header w-full h-[40px] p-3 bg-[#F0F2F6] rounded-[6px] cursor-pointer" onClick={toggleSearchDropdown}>
                <span className="text-sm">Search Evaluation Config</span>
                <FiChevronDown className={`float-right dropdown-arrow ${isSearchDropdownOpen ? 'rotate' : ''}`} />
              </div>

              {isSearchDropdownOpen && (
                <div className="mt-2 border border-gray-300 p-3 rounded-[6px]">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      SearchPrecision
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      SearchRecall
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      SearchOverallScore
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Create Test Suite Button */}
          <button className="w-fit text-base rounded-md px-4 py-2 border border-[#D5D6D8] mt-6">Create Test Suite</button>
        </div>
      </PageBody>
  );
};

export default CreateTestSuite;
