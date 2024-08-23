import React from "react";

interface ButtonProps {
  text: string;
  isSubmitting?: boolean;
  onClick?: () => void;
  loadingText?: string;
  className?: React.ComponentProps<"section">["className"];
}

const Button: React.FC<ButtonProps> = ({
  text,
  isSubmitting = false,
  onClick,
  loadingText,
  className,
}) => {
  return (
    <button
      disabled={isSubmitting}
      className={`text-white bg-gradient-to-r hover:cursor-pointer from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br  rounded-[0.25rem] text-[0.8rem] sm:text-[0.84rem]  font-semibold px-4 sm:px-5 py-3 text-center transition-transform duration-300 ease-in-out transform ${className}`}
      type="submit"
      onClick={onClick}
    >
      <svg
        className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
          isSubmitting ? "inline" : "hidden"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {isSubmitting ? `${loadingText ? loadingText : "Submitting..."}` : text}
    </button>
  );
};

export default Button;
