// src/api/ProjectAPI.js  
  
const BASE_URL = 'your_api_base_url_here'; // Replace with your actual API base URL  
  
export const getProjectName = async () => {  
  try {  
    const response = await fetch(`${BASE_URL}/getProjectName`);  
    if (!response.ok) {  
      throw new Error(`Error fetching project name: ${response.statusText}`);  
    }  
    return await response.json();  
  } catch (error) {  
    throw new Error(`Error fetching project name: ${error.message}`);  
  }  
};  
  
export const getTestSuiteName = async (projectId) => {  
  try {  
    const response = await fetch(`${BASE_URL}/getTestSuiteName?projectId=${projectId}`);  
    if (!response.ok) {  
      throw new Error(`Error fetching test suite name: ${response.statusText}`);  
    }  
    return await response.json();  
  } catch (error) {  
    throw new Error(`Error fetching test suite name: ${error.message}`);  
  }  
};  