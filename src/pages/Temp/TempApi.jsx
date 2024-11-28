import React, { useState, useEffect } from 'react';
import PageBody from '../../components/PageBody';

const TempApi = () => {

  return (
    <PageBody />
  );
}

export default TempApi;


// import React, { useState, useEffect } from 'react';

// const TempApi = () => {
//   const [name, setName] = useState(''); // State to hold the input value
//   const [age, setAge] = useState(null); // State to hold the fetched age
//   const [triggerFetch, setTriggerFetch] = useState(false); // Trigger to control useEffect

//   // useEffect to fetch the age when triggerFetch changes
//   useEffect(() => {
//     if (triggerFetch && name) {
//       fetch(`https://api.agify.io/?name=${name}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setAge(data.age); // Set the fetched age to state
//           setTriggerFetch(false); // Reset trigger to prevent repeated fetches
//         })
//         .catch((error) => console.error('Error fetching age:', error));
//     }
//   }, [triggerFetch, name]); // Dependencies include triggerFetch and name

//   // Function to handle button click and trigger the useEffect
//   const handleFetchAge = () => {
//     setTriggerFetch(true); // Set trigger to true on button click
//   };

//   return (
//     <div className='flex flex-col w-full h-screen gap-3 items-center justify-center'>
//       <input 
//         className='border border-black px-4 py-2' 
//         type="text" 
//         placeholder='Enter name' 
//         value={name}
//         onChange={(e) => setName(e.target.value)} // Update name state on input change
//       />
//       <button className='border border-black px-4 py-2' onClick={handleFetchAge}>
//         Find my Age
//       </button>
//       {age !== null && (
//         <p className="text-lg mt-4">Estimated Age: {age}</p>
//       )}
//     </div>
//   );
// }

// export default TempApi;

// import React, { useEffect, useState } from 'react';

// const UpdateProject = () => {
//     const [data, setData] = useState(null); // Initialize data as null
//     const [factData, setFactData] = useState(null);
//     const [catImgData, setCatImgData] = useState(null);

//     useEffect(() => {
//         // Fetch random user data
//         fetch('https://randomuser.me/api/')
//             .then(response => response.json())
//             .then(data => setData(data))
//             .catch(error => console.error("Error fetching data:", error));
//     }, []);

//     useEffect(() => {
//         // Fetch random cat fact
//         fetch('https://catfact.ninja/fact')
//             .then(response => response.json())
//             .then(factData => setFactData(factData))
//             .catch(error => console.error("Error fetching cat fact:", error));
//     }, []);

//     useEffect(() => {
//         // Fetch random cat image
//         fetch('https://api.thecatapi.com/v1/images/search')
//             .then(response => response.json())
//             .then(catImgData => setCatImgData(catImgData[0]))
//             .catch(error => console.error("Error fetching cat image:", error));
//     }, []);

//     const username = data ? `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}` : '';

//     return (
//         <div className="w-full h-screen bg-black flex items-center justify-center gap-4">
//             {data ? (
//                 <div className="flex flex-col bg-white p-4 rounded-sm items-center">
//                     <img className="w-[200px]" src={data.results[0].picture.large} alt={username} />
//                     <h1 className="text-center mt-4 text-lg font-semibold">{username}</h1>
//                 </div>
//             ) : (
//                 <p className="text-white">Loading user data...</p>
//             )}

//             {factData && catImgData ? (
//                 <div className="flex flex-col bg-white p-4 rounded-sm items-center">
//                     <img className="w-[200px]" src={catImgData.url} alt="Random Cat" />
//                     <h1 className="text-center mt-4 text-lg font-semibold max-w-[200px]">{factData.fact}</h1>
//                 </div>
//             ) : (
//                 <p className="text-white">Loading cat data...</p>
//             )}

//             <div className='text-white'>
//                 hi
//             </div>
//         </div>
//     );
// };

// export default UpdateProject;
