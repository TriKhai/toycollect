import React from "react";

interface InputProps {
  title: string;
  placeholder: string;
  type: "text" | "textarea";
}

export const Input: React.FC<InputProps> = ({ title, placeholder, type }) => {
  return (
    <div className="mb-2"> 
      <label className="block text-sm font-bold" htmlFor={title}>
        {title}
      </label>
      {type === 'text' && (
        <input
        className="border-1 p-4 py-3 rounded-md mt-2 w-full"
        placeholder={placeholder}
        id={title}
        />
      )}
      {type === 'textarea' && (
        <textarea
        className="border-1 p-4 py-3 rounded-md mt-2 w-full"
        placeholder={placeholder}
        id={title}
        />
      )}
      
    </div>
  );
};
