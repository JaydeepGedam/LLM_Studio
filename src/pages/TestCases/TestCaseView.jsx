import React, { useState } from "react";
import PageBody from "../../components/PageBody";
import ProjectDetails from "../../components/ProjectDetails";

const TestCaseView = () => {
  const [testCases, setTestCases] = useState([]);

  const handleTestCasesFetched = (cases) => {
    // Ensure the cases contain default values for empty fields
    const updatedCases = cases.map(testCase => ({
      ...testCase,
      TestScenarioTitle: testCase.TestScenarioTitle || 'None',
      IsActive: testCase.IsActive || false, // Ensure IsActive has a boolean value
    }));
    setTestCases(updatedCases);
  };

  return (
    <PageBody>
      <div className="w-[80%] mx-auto">
        <ProjectDetails title="Test Case View" onTestCasesFetched={handleTestCasesFetched} />

        {/* Test Cases Table */}
        {testCases.length > 0 && (
          <div className="mt-4 border border-gray-200 rounded-md overflow-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr>
                  {Object.keys(testCases[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {testCases.map((testCase, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.entries(testCase).map(([key, value], idx) => (
                      <td key={idx} className="border border-gray-300 px-4 py-2 truncate">
                        {key === 'IsActive' ? (
                          <input
                            type="checkbox"
                            checked={value}
                            disabled
                            className="cursor-pointer"
                          />
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageBody>
  );
};

export default TestCaseView;


// in the above code, if we are not selecting project and clicking the button, it is still showing table values for 1st project and 1st test suite

// but if no project is selected then no test suites should be visible and if no project and no test suite is selected then on click of button, on popup should be visible which tells to select project and test suite accordingly

// so flow is like
// 1. select the project
// 2. test suites related to that project should be visible
// 3. select the test suite
// 4. then only on click of button, table values should be visible