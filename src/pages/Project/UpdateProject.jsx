import React, { useState, useEffect } from "react";
import PageBody from "../../components/PageBody";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { postRequest } from "../../Services/api";

const API_BASE_URL = "http://localhost:8000";

const UpdateProject = () => {
  const [projects, setProjects] = useState([]); // Projects fetched from API
  const [selectedProject, setSelectedProject] = useState(null); // Selected project ID
  const [projectDetails, setProjectDetails] = useState({}); // Fetched project details
  const [parameters, setParameters] = useState([]); // Parameters for the project
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error messages

  const paramOptions = ["Integer", "String", "Boolean"]; // Parameter type options

  // Fetch available projects for the dropdown
  useEffect(() => {
    const fetchDropdownValues = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/getdropdownvalues?table_name=ProjectMaster&display_field=ProjectTitle&value_field=ProjectId`
        );
        if (!response.ok) throw new Error("Failed to fetch dropdown values");
        const data = await response.json();
        const projectData = data.map((project) => ({
          title: project.ProjectTitle,
          id: project.ProjectId,
        }));
        setProjects(projectData);
      } catch (err) {
        setError("Failed to fetch projects. Please try again.");
        console.error("Error fetching dropdown values:", err);
      }
    };

    fetchDropdownValues();
  }, []);

  // Fetch project details based on selected project
  const fetchProjectDetails = async () => {
    if (!selectedProject) {
      setError("Please select a project from the dropdown.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/getprojectlist?project_id=${selectedProject}`
      );
      if (!response.ok) throw new Error("Failed to fetch project details");
      const data = await response.json();

      setProjectDetails(data);
      setParameters(
        data.ProjectFilterParams ? JSON.parse(data.ProjectFilterParams) : []
      );
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch project details. Please try again.");
      console.error("Error fetching project details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle parameter change
  const handleParameterChange = (index, field, value) => {
    const updatedParams = parameters.map((param, i) =>
      i === index ? { ...param, [field]: value } : param
    );
    setParameters(updatedParams);
  };

  // Add a new parameter
  const addParameter = () => {
    setParameters([...parameters, { name: "", type: "Integer" }]);
  };

  // Reset all parameters
  const resetParameters = () => {
    setParameters([]);
  };

  // Remove a parameter
  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  // Update the project with modified details
  const updateProject = async () => {
    if (!projectDetails.ProjectTitle?.trim()) {
      alert("Project title cannot be empty.");
      return;
    }

    if (parameters.some((param) => !param.name?.trim())) {
      alert("Please enter valid parameter names.");
      return;
    }

    const updatedProjectData = {
      ProjectTitle: projectDetails.ProjectTitle.trim(),
      ProjectDescription: projectDetails.ProjectDescription?.trim() || "",
      ProjectLLMEvaluationModel:
        projectDetails.ProjectLLMEvaluationModel || "azure_openai",
      ProjectFilterParams: JSON.stringify(parameters),
      ProjectOwnerEmailId: projectDetails.ProjectOwnerEmailId || "NULL",
      ProjectCreatedBy: projectDetails.ProjectCreatedBy || "admin",
      ProjectModifiedBy: "admin",
    };

    try {
      const response = await postRequest({
        url: `${API_BASE_URL}/updateproject?projectid=${selectedProject}`,
        jsonData: updatedProjectData,
      });

      if (response) {
        alert("Project updated successfully!");
      } else {
        const errorData = await response.json().catch(() => response.text());
        throw new Error(
          typeof errorData === "string" ? errorData : "Failed to update project."
        );
      }
    } catch (err) {
      console.error("Error updating project:", err);
      alert(`Error updating project: ${err.message}`);
    }
  };

  // Render project details section
  const renderProjectDetails = () => {
    if (error) {
      return <p className="text-red-500 text-xs">{error}</p>;
    }

    if (!projectDetails || Object.keys(projectDetails).length === 0) {
      return <p className="text-gray-500">No project details available.</p>;
    }

    return (
      <>
        <div className="flex flex-col gap-2">
          <h1>Project Description</h1>
          <textarea
            className="p-3 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-full"
            value={projectDetails.ProjectDescription || ""}
            onChange={(e) =>
              setProjectDetails({
                ...projectDetails,
                ProjectDescription: e.target.value,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1>Project LLM Evaluation Model</h1>
          <input
            className="p-3 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-full"
            value={projectDetails.ProjectLLMEvaluationModel || ""}
            readOnly
          />
        </div>

        <div className="flex flex-col gap-4 w-[100%]">
          {parameters.map((param, index) => (
            <div key={index} className="flex gap-4 items-center w-[100%]">
              <input
                type="text"
                placeholder={`Name ${index + 1}`}
                value={param.name}
                onChange={(e) =>
                  handleParameterChange(index, "name", e.target.value)
                }
                className="p-2 bg-[#F0F2F6] border-none outline-none rounded-[6px] w-[46%]"
              />
              <div className="w-[46%]">
                <Dropdown
                  bgcolor="#F0F2F6"
                  height="40px"
                  options={paramOptions}
                  placeholder={param.type}
                  onChange={(value) =>
                    handleParameterChange(index, "type", value)
                  }
                />
              </div>
              <button
                onClick={() => removeParameter(index)}
                className="text-red-500 text-lg"
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button btnText="Add New Parameter" onClick={addParameter} />
          <Button btnText="Reset Parameters" onClick={resetParameters} />
        </div>
      </>
    );
  };

  return (
    <PageBody>
      <div className="w-[80%] flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Update Your Project</h1>

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

        <Button btnText="Get Project Details" onClick={fetchProjectDetails} />

        {loading ? (
          <p>Loading project details...</p>
        ) : (
          renderProjectDetails()
        )}

        {projectDetails && Object.keys(projectDetails).length > 0 && (
          <Button btnText="Update Project" onClick={updateProject} />
        )}
      </div>
    </PageBody>
  );
};

export default UpdateProject;
