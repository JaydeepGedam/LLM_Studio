import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateTestSuite from "./pages/TestSuites/CreateTestSuite";
import CreateProject from "./pages/Project/CreateProject";
import UpdateProject from "./pages/Project/UpdateProject";
import TempApi from "./pages/Temp/TempApi";
import TestCaseView from "./pages/TestCases/TestCaseView";

const updateFaviconAndTitle = ({ title, icon }) => {
    document.title = title;
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/default/48px.svg`;
};

function App() {
    const location = useLocation();
    const isProduction = import.meta.env.VITE_ENV === 'production'; // Use Vite's import.meta.env
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT_URL;  // Use Vite's import.meta.env

    useEffect(() => {
        const routeMetadata = {
            '/': { title: "Create Project", icon: "add_circle" },
            '/updateProject': { title: "Update Project", icon: "edit" },
            '/testcaseview': { title: "View Test Cases", icon: "grid_view" },
            '/createTSuite': { title: "Create Test Suite", icon: "add_circle" },
            '/tempapi': { title: "Temp API Page", icon: "help" },
        };

        const metadata = routeMetadata[location.pathname];

        if (metadata) {
            updateFaviconAndTitle(metadata);
        }
    }, [location]);

    return (
        <Routes>
            {isProduction ? (
                <>
                    <Route path="/LLM_Studio/createTSuite" element={<CreateTestSuite />} />
                    <Route path="/LLM_Studio" element={<CreateProject />} />
                    <Route path="/LLM_Studio/updateProject" element={<UpdateProject />} />
                    <Route path="/LLM_Studio/tempapi" element={<TempApi />} />
                    <Route path="/LLM_Studio/testcaseview" element={<TestCaseView />} />
                </>
            ) : (
                <>
                    <Route path="/createTSuite" element={<CreateTestSuite />} />
                    <Route path="/" element={<CreateProject />} />
                    <Route path="/updateProject" element={<UpdateProject />} />
                    <Route path="/tempapi" element={<TempApi />} />
                    <Route path="/testcaseview" element={<TestCaseView />} />
                </>
            )}
        </Routes>
    );
}

export default App;
