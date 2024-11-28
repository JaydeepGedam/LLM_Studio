import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";

const API_BASE_URL = "http://localhost:8000";

const ProjectDetails = ({ title, onTestCasesFetched }) => {
  const [projects, setProjects] = useState([]);
  const [testsuites, setTestSuites] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTestSuite, setSelectedTestSuite] = useState("");
  const [projectError, setProjectError] = useState("");
  const [testSuiteError, setTestSuiteError] = useState("");
  const [testCaseError, setTestCaseError] = useState("");

  const [testSuitePlaceholder, setTestSuitePlaceholder] = useState(
    "-- select the project first --"
  );

  // Fetch projects
  useEffect(() => {
    fetch(
      `${API_BASE_URL}/getdropdownvalues?table_name=ProjectMaster&display_field=ProjectId&value_field=ProjectTitle`
    )
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => {
        const projectData = data.map((project) => ({
          title: project.ProjectTitle,
          id: project.ProjectId,
        }));
        setProjects(projectData);
      })
      .catch((error) => {
        setProjectError("Failed to fetch projects. Please try again.");
        console.error("Error fetching projects:", error);
      });
  }, []);

  // Update placeholder for Test Suite dynamically
  useEffect(() => {
    if (selectedProject) {
      setTestSuitePlaceholder("Select Test Suite");
    } else {
      setTestSuitePlaceholder("Please select the project first");
    }
  }, [selectedProject]);

  // Fetch test suites based on selected project
  useEffect(() => {
    if (selectedProject) {
      fetch(
        `${API_BASE_URL}/getdropdownvalues?table_name=TestSuiteMaster&display_field=TestSuiteId&value_field=TestSuiteTitle&condition='ProjectId=${selectedProject}'`
      )
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((data) => {
          const testSuiteData = data.map((suite) => ({
            title: suite.TestSuiteTitle,
            id: suite.TestSuiteId,
          }));
          setTestSuites(testSuiteData);
          setSelectedTestSuite(""); // Reset the test suite selection when project changes
        })
        .catch((error) => {
          setTestSuiteError("Failed to fetch test suites. Please try again.");
          console.error("Error fetching test suites:", error);
        });
    } else {
      setTestSuites([]);
      setSelectedTestSuite("");
    }
  }, [selectedProject]);

  const handleProjectChange = (projectTitle) => {
    const selectedProjectId = projects.find(
      (project) => project.title === projectTitle
    )?.id;
    setSelectedProject(selectedProjectId || ""); // Ensure fallback to empty
  };

  const handleTestSuiteChange = (testSuiteTitle) => {
    const selectedTestSuiteId = testsuites.find(
      (suite) => suite.title === testSuiteTitle
    )?.id;
    setSelectedTestSuite(selectedTestSuiteId || ""); // Ensure fallback to empty
  };

  const fetchTestCases = async () => {
    if (!selectedProject || !selectedTestSuite) {
      setTestCaseError("Please select both Project and Test Suite.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/gettestcaselist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ProjectId: selectedProject,
          TestSuiteId: selectedTestSuite,
        }),
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      if (data.length > 0) {
        onTestCasesFetched(data);
        setTestCaseError(""); // Clear error if data fetched successfully
      } else {
        onTestCasesFetched([]);
        setTestCaseError("No test cases found for the selected Test Suite.");
      }
    } catch (error) {
      setTestCaseError("Failed to fetch test cases. Please try again.");
      console.error("Error fetching test cases:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">{title}</h1>

      {/* Project Selection */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm">Select the Project</h1>
        <Dropdown
          bgcolor="#F0F2F6"
          height="40px"
          placeholder={"-- Select the Project --"}
          options={projects.map((project) => project.title)}
          value={
            projects.find((project) => project.id === selectedProject)?.title ||
            ""
          }
          onChange={handleProjectChange}
        />
        {projectError && (
          <p className="text-red-500 text-xs">{projectError}</p>
        )}
      </div>

      {/* Test Suite Selection */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm">Select the Test Suite</h1>
        <Dropdown
          bgcolor="#F0F2F6"
          height="40px"
          placeholder={testSuitePlaceholder}
          options={testsuites.map((suite) => suite.title)}
          value={
            testsuites.find((suite) => suite.id === selectedTestSuite)?.title ||
            ""
          }
          onChange={handleTestSuiteChange}
          disabled={!selectedProject}
        />
        {testSuiteError && (
          <p className="text-red-500 text-xs">{testSuiteError}</p>
        )}
      </div>

      {/* Get Test Cases Button */}
      <Button
        btnText="Get Test Cases"
        onClick={fetchTestCases}
        disabled={!selectedProject || !selectedTestSuite}
      />
      {testCaseError && (
        <p className="text-red-500 text-xs">{testCaseError}</p>
      )}
    </div>
  );
};

export default ProjectDetails;
