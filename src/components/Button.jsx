const Button = ({ btnText, onClick, className = "" }) => {
    return (
      <button
        onClick={onClick}
        className={`w-fit text-base rounded-md px-4 py-2 border border-[#D5D6D8] ${className}`}
      >
        {btnText}
      </button>
    );
  };
  
  export default Button;
  