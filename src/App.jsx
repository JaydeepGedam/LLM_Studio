import React from "react";
import {Route, Routes } from "react-router-dom";
import CreateTestSuite from "./pages/CreateTestSuite";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    
      <Routes>
        <Route path="/createTSuite" element={<CreateTestSuite />} />
        <Route path="*" element={<CreateProject />} exact /> {/* Default page */}
      </Routes>
  );
}

export default App;
