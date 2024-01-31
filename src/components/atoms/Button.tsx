import React from "react";

interface CustomButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Button = ({ text, type, disabled }: CustomButtonProps) => {
  return (
    <button
      className="rounded-md bg-blue-600 py-3 font-bold text-white hover:bg-blue-400 transition-all"
      style={{
        background: disabled ? "#e0e0e0" : "",
      }}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
