import React from 'react';

const InputComp = ({ inputTitle, projectName, setProjectName, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1>{inputTitle}</h1>
      <input
        className={`p-3 bg-[#F0F2F6] border-none outline-none rounded-[6px] h-[40px]`}
        type="text"
        placeholder={placeholder}
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
    </div>
  );
};

export default InputComp;
