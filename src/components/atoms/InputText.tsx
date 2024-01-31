import React from "react";
import IconEye from "./icons/IconEye";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

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
    <InputGroup>
      <Input
        type={type}
        placeholder={label}
        autoComplete="off"
        {...register(name, validations)}
      />
      {endIcon && (
        <InputRightElement onClick={onEndIconClick}>
          {endIcon}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default InputText;
