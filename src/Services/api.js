// Helper function to fetch headers
const getHeaders = () => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    return token ? { Authorization: `Bearer ${token}`, Username: username } : {};
  };
  
  // Function for POST requests
  export const postRequest = async ({ url, jsonData, data, params, headers, files }) => {
    try {
      const combinedHeaders = { ...getHeaders(), ...headers };
      let body;
  
      // Prepare body based on the presence of files, jsonData, or form data
      if (files) {
        body = new FormData();
        Object.entries(files).forEach(([key, file]) => body.append(key, file));
        if (data) Object.entries(data).forEach(([key, value]) => body.append(key, value));
      } else if (jsonData) {
        body = JSON.stringify(jsonData);
        combinedHeaders["Content-Type"] = "application/json";
      } else if (data) {
        body = new URLSearchParams(data).toString();
        combinedHeaders["Content-Type"] = "application/x-www-form-urlencoded";
      }
  
      const queryParams = params ? `?${new URLSearchParams(params).toString()}` : "";
      const response = await fetch(url + queryParams, {
        method: "POST",
        headers: combinedHeaders,
        body,
      });
  
      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json().catch(() => response.text());
        const errorMessage =
          typeof errorData === "string" ? errorData : errorData.message || response.statusText;
        throw new Error(errorMessage);
      }
  
      // Attempt to parse JSON, fallback to plain text if JSON parsing fails
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } catch (e) {
      console.error(`Error during POST request to ${url}: ${e.message}`);
      throw new Error(e.message || "An unexpected issue occurred. Please try again later.");
    }
  };
  
  
  // Function for GET requests
  export const getRequest = async ({ url, params, headers }) => {
    try {
      const queryParams = params ? `?${new URLSearchParams(params).toString()}` : "";
      const response = await fetch(url + queryParams, {
        method: "GET",
        headers: { ...getHeaders(), ...headers },
      });
  
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (e) {
      console.error(`Error: ${e.message}`);
      throw new Error("An unexpected issue occurred. Please try again later.");
    }
  };
  