import React from "react";
import IconEye from "./icons/IconEye";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputTextProps {
  type: string;
  label: string;
  className?: string;
  endIcon?: any;
  onEndIconClick?: () => void;
  name: string;
  register: UseFormRegister<FieldValues>;
  validations?: RegisterOptions<FieldValues, string>;
}

const InputText = ({
  type,
  label,
  endIcon,
  onEndIconClick,
  register,
  name,
  validations,
}: InputTextProps) => {
  return (
    <div className="w-full border-2 border-black border-opacity-20 rounded-md py-2 px-3 h-14 flex justify-between gap-3">
      <input
        type={type}
        placeholder={label}
        className="border-none block outline-none w-full"
        {...register(name, validations)}
      />
      {endIcon && (
        <button type="button" onClick={onEndIconClick}>
          {endIcon}
        </button>
      )}
    </div>
  );
};

export default InputText;
