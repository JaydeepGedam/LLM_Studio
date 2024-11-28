// src/api/API.js  
  
const BASE_URL = 'your_api_base_url_here'; // Replace with your actual API base URL  
  
export const getTestCases = async (data) => {  
  try {  
    const response = await fetch(`${BASE_URL}/gettestcaselist`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify(data),  
    });  
  
    if (!response.ok) {  
      throw new Error(`Error while loading test cases: ${response.statusText}`);  
    }  
  
    return await response.json();  
  } catch (error) {  
    throw new Error(`Error while loading test cases: ${error.message}`);  
  }  
};  