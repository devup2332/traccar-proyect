"use client";
import Button from "@/components/atoms/Button";
import InputText from "@/components/atoms/InputText";
import IconEye from "@/components/atoms/icons/IconEye";
import IconNoEye from "@/components/atoms/icons/IconNoEye";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const loginUser = async (formData: any) => {
    const { username, password } = formData;
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const dataResponse = await response.json();
    console.log({ dataResponse });
  };

  const handleError = () => {
    console.log({ errors });
  };

  return (
    <div className="bg-bluegradient h-screen flex items-center justify-center">
      <form
        action=""
        className="grid gap-5 bg-white p-8 rounded-xl w-8/12"
        onSubmit={handleSubmit(loginUser, handleError)}
      >
        <h1 className="text-2xl text-center font-semibold">Ingresar</h1>

        <div>
          <InputText
            name="username"
            label="Username"
            type="text"
            register={register}
            validations={{
              required: {
                value: true,
                message: "Ingrese un nombre de usuario",
              },
            }}
          />
          {errors["username"] && (
            <p className="text-red-400 font-bold">
              {errors["username"]?.message as string}
            </p>
          )}
        </div>
        <div>
          <InputText
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            validations={{
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            }}
            endIcon={
              showPassword ? (
                <IconEye className="w-7 h-7" />
              ) : (
                <IconNoEye className="w-7 h-7" />
              )
            }
            onEndIconClick={() => setShowPassword(!showPassword)}
            register={register}
          />

          {errors["password"] && (
            <p className="text-red-400 font-bold">
              {errors["password"]?.message as string}
            </p>
          )}
        </div>
        <Button
          text="Login"
          color="#000000"
          type="submit"
          disabled={errors["username"] || errors["password"] ? true : false}
        />
      </form>
    </div>
  );
};

export default Login;
