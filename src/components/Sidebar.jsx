import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

const Sidebar = () => {
    const links = [
        {
            title: "Project",
            lnames: [
                { icon: <IoIosAddCircleOutline />, n1: "Create" },
                { icon: <IoIosAddCircleOutline />, n1: "Update" },
            ]
        },
        {
            title: "Test Case",
            lnames: [
                { icon: <IoIosAddCircleOutline />, n1: "Synthetic Data Generator" },
                { icon: <IoIosAddCircleOutline />, n1: "Synthetic Data Addition" },
                { icon: <IoIosAddCircleOutline />, n1: "Upload" },
                { icon: <IoIosAddCircleOutline />, n1: "View" },
                { icon: <IoIosAddCircleOutline />, n1: "Assign" },
            ]
        },
        {
            title: "Test Suite",
            lnames: [
                { icon: <IoIosAddCircleOutline />, n1: "Create" },
                { icon: <IoIosAddCircleOutline />, n1: "Config" },
                { icon: <IoIosAddCircleOutline />, n1: "Execute" },
                { icon: <IoIosAddCircleOutline />, n1: "Summary" },
            ]
        },
        {
            title: "Analytics",
            lnames: [
                { icon: <IoIosAddCircleOutline />, n1: "Dashboard" },
                { icon: <IoIosAddCircleOutline />, n1: "Data Insight" },
            ]
        },
        {
            title: "Fine Tuning",
            lnames: [
                { icon: <IoIosAddCircleOutline />, n1: "Meta Prompts" },
            ]
        },
        {
            title: "Feedback",
            lnames: [
                { icon: <IoIosAddCircleOutline />, n1: "View" },
            ]
        },
    ];

    return (
        <div>
            <h1 className='text-xl font-bold'>Welcome, Jaydeep Nitin Gedam</h1>
            <div className='text-[14px] pt-6 flex flex-col gap-4'>
              {links.map((link, index) => (
                  <div key={index} className='flex flex-col gap-2'>
                      <h1 className='font-bold'>{link.title}</h1>
                      <div className='flex flex-col gap-2 pl-4'>
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
        </div>
    );
};

export default Sidebar;
