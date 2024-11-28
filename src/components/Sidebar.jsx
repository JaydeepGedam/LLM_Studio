import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const links = [
        {
            title: "Project",
            lnames: [
                {
                    icon: <span className="material-symbols-outlined icon-size">add_circle</span>,
                    n1: "Create",
                    onClick: () => handleNavigation('/', "Create Project", "add_circle"),
                },
                {
                    icon: <span className="material-symbols-outlined icon-size">edit</span>,
                    n1: "Update",
                    onClick: () => handleNavigation('/updateProject', "Update Project", "edit"),
                },
            ]
        },
        {
            title: "Test Case",
            lnames: [
                { icon: <span className="material-symbols-outlined icon-size">add_circle</span>, n1: "Synthetic Data Generator" },
                { icon: <span className="material-symbols-outlined icon-size">group_add</span>, n1: "Synthetic Data Addition" },
                { icon: <span className="material-symbols-outlined icon-size">upload</span>, n1: "Upload" },
                {
                    icon: <span className="material-symbols-outlined icon-size">grid_view</span>,
                    n1: "View",
                    onClick: () => handleNavigation('/testcaseview', "View Test Cases", "grid_view"),
                },
                { icon: <span className="material-symbols-outlined icon-size">assignment</span>, n1: "Assign" },
            ]
        },
        {
            title: "Test Suite",
            lnames: [
                {
                    icon: <span className="material-symbols-outlined icon-size">add_circle</span>,
                    n1: "Create",
                    onClick: () => handleNavigation('/createTSuite', "Create Test Suite", "add_circle"),
                },
                { icon: <span className="material-symbols-outlined icon-size">settings</span>, n1: "Config" },
                { icon: <span className="material-symbols-outlined icon-size">commit</span>, n1: "Execute" },
                { icon: <span className="material-symbols-outlined icon-size">summarize</span>, n1: "Summary" },
            ]
        },
        {
            title: "Analytics",
            lnames: [
                { icon: <span className="material-symbols-outlined icon-size">dashboard</span>, n1: "Dashboard" },
                { icon: <span className="material-symbols-outlined icon-size">query_stats</span>, n1: "Data Insight" },
            ]
        },
        {
            title: "Fine Tuning",
            lnames: [
                { icon: <span className="material-symbols-outlined icon-size">tune</span>, n1: "Meta Prompts" },
            ]
        },
        {
            title: "Feedback",
            lnames: [
                { icon: <span className="material-symbols-outlined icon-size">reviews</span>, n1: "View" },
            ]
        },
    ];

    // Function to handle navigation and update title/favicon
    const handleNavigation = (path, title, icon) => {
        navigate(path);
        updateFaviconAndTitle(title, icon);
    };

    // Function to update the favicon and title dynamically
    const updateFaviconAndTitle = (title, icon) => {
        // Update the page title
        document.title = title;

        // Update the favicon
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon}/default/48px.svg`;
        }
    };

    return (
        <div className=''>
            <h1 className='text-xl font-bold'>Welcome, Jaydeep Nitin Gedam</h1>
            <div className='text-[16px] pt-6 flex flex-col gap-4'>
                {links.map((link, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                        <h1 className='font-bold'>{link.title}</h1>
                        <div className='flex flex-col gap-2 pl-4'>
                            {link.lnames.map((link1, index1) => (
                                <div
                                    key={index1}
                                    className="flex items-center cursor-pointer"
                                    onClick={link1.onClick ? link1.onClick : null} // Handle onClick if provided
                                >
                                    {link1.icon}
                                    <span className="ml-2">{link1.n1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
