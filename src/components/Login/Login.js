import React from "react";
import Input from "../Input/Input";
import "./Login.css";
import Button from "../Button/Buton";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../../apis/auth";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const loginMutation = useMutation(apiLogin, {
    // cacheTime: 3 * 24 * 60 * 60 * 1000,
  });
  const handleLogin = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        if (data) {
          Swal.fire("Congratulation", "Login successfully", "success");
          console.log("Login successful", data);
          reset();
        } else {
          Swal.fire("Error", "Login failed", "error");
          console.log("Login failed");
        }

        // localStorage.setItem("accessToken", data.token);
      },

      onError: (error) => {
        console.error("Login failed", error);
        Swal.fire("Error", "Login failed", "error");
      },
    });
  };
  return (
    <div className="login" onSubmit={handleSubmit(handleLogin)}>
      <form className="login-form">
        <h3 className="login-title">Login</h3>
        <Input
          id={"username"}
          label="username"
          type="text"
          register={register}
          errors={errors}
          validate={{
            required: "Username is required",
            // pattern: {
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //   message: "Invalid email address",
            // },
          }}
        />
        <Input
          id={"password"}
          label="password"
          register={register}
          errors={errors}
          type="password"
          validate={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />
        <Button type="submit">Login</Button>
        <br />
        <small>username: kminchelle</small>
        <br />
        <small>password: 0lelplR</small>
      </form>
    </div>
  );
};

export default Login;
