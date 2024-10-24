import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";


const LinkTabs = () => {
    const links = [
        {
            title: "Project",
            lnames: [
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "Create",
                },
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "Update",
                },
            ]
        },
        {
            title: "Test Case",
            lnames: [
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Synthetic Data Generator",
                },
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Synthetic Data Addition",
                },
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "Upload",
                },
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "View",
                },
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "Assign",
                },
            ]
        },
        {
            title: "Test Suite",
            lnames: [
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Create",
                },
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Config",
                },
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "Execute",
                },
                {
                    icon: <IoIosAddCircleOutline />, 
                    n1: "Summary",
                },
            ]
        },
        {
            title: "Analytics",
            lnames: [
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Dashboard",
                },
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Data Insight",
                },
            ]
        },
        {
            title: "Fine Tuning",
            lnames: [
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "Meta Prompts",
                },
            ]
        },
        {
            title: "Feedback",
            lnames: [
                {
                    icon: <IoIosAddCircleOutline />,
                    n1: "View",
                },
            ]
        },
    ];

    return (
        <div>
            {links.map((link, index) => (
                <div key={index}>
                    <h1>{link.title}</h1>
                    <div>
                        {link.lnames.map((link1, index1) => (
                            <div key={index1} className="flex items-center">
                                {link1.icon}
                                <span className="ml-2">{link1.n1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LinkTabs;
