import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CustomDropdown = ({ backgroundColor, height, width, options = [], defaultText, border, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultText);
  const dropdownRef = useRef(null); // To reference the dropdown container

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option); // Call the onChange prop with the selected option
    }
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
      className="relative w-full h-full outline-none border-none rounded-lg"
      style={{ width, backgroundColor, height, border }}
    >
      {/* Dropdown Header */}
      <div
        className="dropdown-header w-full h-full flex items-center justify-between px-3 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-sm">{selectedOption}</span>
        <FiChevronDown className={`dropdown-arrow ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-48 bg-white rounded-md overflow-y-auto shadow-lg border border-gray-200">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
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

const Dropdown = ({ width, bgcolor, height, placeholder, border, options = [], onChange }) => {
  return (
    <div>
      <CustomDropdown
        backgroundColor={bgcolor}
        height={height}
        width={width}
        options={options} // Use options passed via props
        defaultText={placeholder}
        border={border}
        onChange={onChange} // Pass the onChange prop to CustomDropdown
      />
    </div>
  );
};

export default Dropdown;
