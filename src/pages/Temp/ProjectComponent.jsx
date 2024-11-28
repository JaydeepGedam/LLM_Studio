// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import '../assets/CustomDropdown.css'; // For external styling
// import Dropdown from "../components/Dropdown";

// const API_BASE_URL = "your_api_base_url_here"; // Replace with the actual API base URL

// const TestCaseView = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [error, setError] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Fetch the project list on component mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/getprojectlist?project_id=13`, {
//           headers: { 'Content-Type': 'application/json' },
//         });

//         // Log the response data for debugging
//         console.log("Raw response data:", response.data);

//         let projectsArray = null;

//         if (Array.isArray(response.data)) {
//           projectsArray = response.data;
//         } else if (response.data && typeof response.data === 'object') {
//           console.log("response.data keys:", Object.keys(response.data));  // Log the keys of the object
//           // Check if any property contains an array
//           const nestedArray = Object.values(response.data).find(value => Array.isArray(value));
//           projectsArray = nestedArray || [];
//           if (!projectsArray.length) {
//             console.error("No array found in response.data. Full data:", response.data);
//             throw new Error("Unexpected response format: no array found within response.data");
//           }
//         }

//         if (projectsArray.length > 0) {
//           setProjects(projectsArray);
//         } else {
//           throw new Error("Unexpected response format: no array found within response.data");
//         }
//       } catch (err) {
//         setError("Failed to load projects. Please try again later.");
//         console.error("Error fetching projects:", err.message);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Handle dropdown toggle
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Handle project selection
//   const handleProjectSelect = (project) => {
//     setSelectedProject(project);
//     setIsDropdownOpen(false);  // Close dropdown after selection
//   };

//   return (
//     <div className="w-[100%] h-fit flex">
//       <div className="w-[30%] h-fit bg-zinc-200 py-6 px-9">
//         <Sidebar />
//       </div>
//       <div className="w-[70%] text-sm h-fit pt-10 pb-10 flex items-center justify-center">
//         <div className="w-[80%] flex flex-col gap-6">
//           <h1 className="text-4xl font-bold">Test Case View</h1>

//           {/* Project Selection */}
//           <div className="flex flex-col gap-2">
//             <h1 className="text-sm">Select the Project</h1>
//             <div className="relative">
//               <button
//                 className="w-full text-left p-2 bg-gray-200 border border-[#D5D6D8] rounded-md"
//                 onClick={toggleDropdown}
//               >
//                 {selectedProject ? selectedProject.name : (error ? error : "Select the Project")}
//                 {/* Dropdown arrow */}
//                 <span className="ml-2">
//                   {isDropdownOpen ? "▲" : "▼"}
//                 </span>
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute w-full mt-1 bg-white border border-[#D5D6D8] rounded-md shadow-md">
//                   {projects.length > 0 ? (
//                     projects.map((project, index) => (
//                       <div
//                         key={index}
//                         className="p-2 hover:bg-gray-200 cursor-pointer"
//                         onClick={() => handleProjectSelect(project)}
//                       >
//                         {project.name} {/* Assuming project has a 'name' field */}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-2 text-gray-500">No projects available</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Test Suite Selection */}
//           <div className="flex flex-col gap-2">
//             <h1 className="text-sm">Select the Test Suite</h1>
//             <Dropdown bgcolor="#F0F2F6" height="40px" placeholder="Select the Test Suite" />
//           </div>

//           {/* Create Test Suite Button */}
//           <button className="w-fit text-base rounded-md px-4 py-2 border border-[#D5D6D8] mt-2">Get Test Cases</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestCaseView;


import React, { useState, useEffect } from 'react';

const useProjectDetails = () => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const tableName = 'ProjectMaster';
        const displayField = 'ProjectId';
        const valueField = 'ProjectTitle';
        // const condition = `ProjectCreatedBy='${user}'`;
        // const condition = 'ProjectId < 22';

        const response = await getDropdownValues(tableName, displayField, valueField);

        if (response && response.status === 200) {
          setProjectList(response.data);
        } else {
          throw new Error('Failed to fetch project details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  return { projectList, loading, error };
};

const getDropdownValues = async (tableName, displayField, valueField, condition) => {
  const params = {
    table_name: tableName,
    display_field: displayField,
    value_field: valueField,
    condition: condition,
  };

  try {
    const response = await fetch('/api/getdropdown', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
      params: new URLSearchParams(params),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dropdown values');
    }

    const data = await response.json();
    return { status: 200, data };
  } catch (error) {
    console.error('Error fetching dropdown values:', error);
    throw error;
  }
};

const ProjectComponent = () => {
  const { projectList, loading, error } = useProjectDetails();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Project List</h3>
      <ul>
        {projectList.map((project) => (
          <li key={project.ProjectId}>{project.ProjectTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectComponent;
