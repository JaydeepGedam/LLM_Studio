import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateTestSuite from "./pages/TestSuites/CreateTestSuite";
import CreateProject from "./pages/Project/CreateProject";
import UpdateProject from "./pages/Project/UpdateProject";
import TempApi from "./pages/Temp/TempApi";
import TestCaseView from "./pages/TestCases/TestCaseView";

const updateFaviconAndTitle = ({ title, icon }) => {
    // Update the page title
    document.title = title;

    // Update the favicon
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/default/48px.svg`;
};

function App() {
    const location = useLocation();

    useEffect(() => {
        // Define metadata for each route
        const routeMetadata = {
            '/': { title: "Create Project", icon: "add_circle" },
            '/updateProject': { title: "Update Project", icon: "edit" },
            '/testcaseview': { title: "View Test Cases", icon: "grid_view" },
            '/createTSuite': { title: "Create Test Suite", icon: "add_circle" },
            '/tempapi': { title: "Temp API Page", icon: "help" },
        };

        // Get metadata for the current route
        const metadata = routeMetadata[location.pathname];

        // Update favicon and title if metadata exists
        if (metadata) {
            updateFaviconAndTitle(metadata);
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/createTSuite" element={<CreateTestSuite />} />
            <Route path="/" element={<CreateProject />} exact />
            <Route path="/updateProject" element={<UpdateProject />} />
            <Route path="/tempapi" element={<TempApi />} />
            <Route path="/testcaseview" element={<TestCaseView />} />
        </Routes>
    );
}

export default App;
