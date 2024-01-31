"use client";
import Button from "@/components/atoms/Button";
import InputText from "@/components/atoms/InputText";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { sleep } from "@/lib/utils/sleep";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const loginUser = async (formData: any) => {
    const { username, password } = formData;
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });
      const dataResponse = await response.json();
      const { token } = dataResponse;
      localStorage.setItem("token-user", token);
      const id = toast.loading("Ingresando");
      await sleep(3000);
      toast.dismiss(id);
      router.push("/");
    } catch (err) {}
  };

  const handleError = () => {
    console.log({ errors });
  };

  return (
    <div className="bg-bluegradient h-screen flex items-center justify-center">
      <form
        action=""
        className="grid gap-5 bg-gray-800 py-8 px-5 rounded-xl w-10/12 max-w-md 2xl:px-8"
        onSubmit={handleSubmit(loginUser, handleError)}
      >
        <h1 className="text-2xl text-center font-semibold">Ingresar</h1>

        <div>
          <InputText
            name="username"
            label="Usuario o correo"
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
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            validations={{
              required: {
                value: true,
                message: "Ingrese su contraseña",
              },
            }}
            endIcon={
              showPassword ? (
                <FaEyeSlash className="w-7" />
              ) : (
                <FaEye className="w-7" />
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
          text="Ingresar"
          type="submit"
          disabled={errors["username"] || errors["password"] ? true : false}
        />
      </form>
      <Toaster position="bottom-center" visibleToasts={1} />
    </div>
  );
};

export default Login;
