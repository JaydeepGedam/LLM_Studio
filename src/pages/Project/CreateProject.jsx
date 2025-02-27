import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar";
import Dropdown from "../../components/Dropdown";
import { postRequest } from "../../Services/api"; // Import the postRequest function
import PageBody from "../../components/PageBody";
import Button from "../../components/Button";
import InputComp from "../../components/InputComp";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [evalModel, setEvalModel] = useState("");
  const [parameters, setParameters] = useState([]);
  const evalModelOptions = ["Azure Open AI", "Phi 3 Model"];
  const paramOptions = ["Integer", "String", "Boolean"];

  // Add a new parameter
  const addParameter = () => {
    setParameters([...parameters, { name: "", type: "Integer" }]);
  };

  // Remove a specific parameter
  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  // Reset all parameters
  const resetParameters = () => {
    setParameters([]);
  };

  // Handle parameter change
  const handleParameterChange = (index, field, value) => {
    const updatedParams = parameters.map((param, i) =>
      i === index ? { ...param, [field]: value } : param
    );
    setParameters(updatedParams);
  };

  // Validate project name
  const validateProjectName = (name) => {
    const trimmedName = name.trim();

    if (trimmedName.length < 3) {
      alert("Project name must be at least 3 characters long.");
      return false;
    }

    if (trimmedName.length > 50) {
      alert("Project name cannot exceed 50 characters.");
      return false;
    }

    const regex = /^[a-zA-Z0-9 _]*$/;
    if (!regex.test(trimmedName)) {
      alert("Project name can only contain letters, numbers, spaces, and underscores.");
      return false;
    }

    if (trimmedName.includes("  ")) {
      alert("Project name cannot have consecutive spaces.");
      return false;
    }

    const blacklistedWords = ["admin", "test", "project"];
    if (blacklistedWords.includes(trimmedName.toLowerCase())) {
      alert("Project name cannot be a reserved keyword (e.g., Admin, Test).");
      return false;
    }

    if (/^\d+$/.test(trimmedName)) {
      alert("Project name cannot contain only numbers.");
      return false;
    }

    setProjectName(trimmedName); // Update with trimmed value if validation passes
    return true;
  };

  // Validate and submit the project
  const createProject = async () => {
    if (!projectName.trim() || !validateProjectName(projectName)) {
      return;
    }

    if (parameters.some((param) => !param.name.trim())) {
      alert("Please enter valid filter parameters.");
      return;
    }

    // Map the selected evaluation model to the desired format
    let mappedEvalModel;
    switch (evalModel) {
      case "Azure Open AI":
        mappedEvalModel = "azure_openai";
        break;
      case "Phi 3 Model":
        mappedEvalModel = "phi";
        break;
      default:
        mappedEvalModel = evalModel.toLowerCase().replace(/\s+/g, "_");
    }

    const inputData = {
      ProjectTitle: projectName,
      ProjectDescription: projectDescription,
      ProjectLLMEvaluationModel: mappedEvalModel, // Use the mapped value
      ProjectFilterParams: JSON.stringify(parameters),
      ProjectCreatedBy: "admin", // Replace with dynamic username if available
      ProjectModifiedBy: "admin",
    };

    try {
      const response = await postRequest({
        url: "http://localhost:8000/createproject",
        jsonData: inputData,
      });
      alert(`Successfully created the project: '${projectName}'`);
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <PageBody>
      <div className="w-[80%] flex flex-col gap-6 pt-10">
          <h1 className="text-4xl font-bold">Create Your Project.</h1>

          {/* Project Title */}
          <InputComp inputTitle="Project Title *"  projectName={projectName} setProjectName={setProjectName} />

          {/* Project Description */}
          <div className="flex flex-col gap-2">
            <h1>Project Description</h1>
            <textarea
              className="p-3 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-full"
              placeholder="Enter project information here"
              rows={4}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>

          {/* LLM Evaluation Model */}
          <div className="flex flex-col gap-2">
            <h1>Project LLM Evaluation Model</h1>
            <Dropdown
              bgcolor="#F0F2F6"
              height="40px"
              placeholder="Select"
              options={evalModelOptions}
              selected={evalModel}
              onChange={setEvalModel}
            />
          </div>

          {/* Parameters */}
          <div className="flex flex-col gap-4 w-[100%]">
            {parameters.map((param, index) => (
              <div key={index} className="flex gap-4 items-center w-[100%]">
                {/* Input box */}
                <input
                  type="text"
                  placeholder={`Name ${index + 1}`}
                  value={param.name}
                  onChange={(e) =>
                    handleParameterChange(index, "name", e.target.value)
                  }
                  className="p-2 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-[46%]"
                />

                {/* Dropdown */}
                <div className="w-[46%]">
                  <Dropdown
                    bgcolor="#F0F2F6"
                    height="40px"
                    placeholder="Integer"
                    options={paramOptions}
                    selected={param.type}
                    onChange={(value) =>
                      handleParameterChange(index, "type", value)
                    }
                  />
                </div>

                {/* Cross Icon */}
                <button
                  onClick={() => removeParameter(index)}
                  className="w-[8%] text-center text-white rounded-md p-2"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <Button btnText="Add Filter Parameter" onClick={addParameter}></Button>
            <Button btnText="Reset Filter Parameter" onClick={resetParameters}></Button>
          </div>

          {/* Create Project Button */}
          <Button btnText="Create Project" onClick={createProject}></Button>
        </div>
    </PageBody>
  );
};

export default CreateProject;
