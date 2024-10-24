import React, { useState, useEffect, useRef } from 'react';
import '../assets/CustomDropdown.css'; // For external styling
import { FiChevronDown } from 'react-icons/fi'; // Importing the dropdown arrow icon

const CustomDropdown = ({ backgroundColor, height, width, options, defaultText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultText);
  const dropdownRef = useRef(null); // To reference the dropdown container

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="dropdown-container w-full h-full"
      style={{ width: `${width}`, backgroundColor, height: `${height}` }}
    >
      <div className="dropdown-header w-full h-full flex items-center" onClick={toggleDropdown}>
        <span className='text-[18px]'>{selectedOption}</span>
        <FiChevronDown className={`float-right dropdown-arrow ${isOpen ? 'open' : ''}`} /> {/* Using React Icon */}
      </div>
      {isOpen && (
        <ul className="dropdown-list" style={{ backgroundColor }}>
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Usage
const App = ({ width, bgcolor, height, placeholder}) => {
  const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];
  return (
    <div>
      <CustomDropdown
        backgroundColor={bgcolor}
        height={height}
        width={width}
        options={dropdownOptions}
        defaultText={placeholder}
      />
    </div>
  );
};

export default App;

