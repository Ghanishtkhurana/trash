import Errmsg from "@/core/Errmsg";
import useLogin from "@/libs/mutations/auth/useLogin";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Index = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {mutate : login} = useLogin()
  const [pass, setPass] = useState(false);

  const onSubmit = (data) => {
    console.log("data=>", data);
    login({formdata : data})

  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* name */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 justify-center items-center flex-col p-10 border-1 border-gray-700 rounded-md w-[400px]"
      >
        <div>
          <p className="text-[29px] font-semibold">Login</p>
        </div>
        <div className="w-full">
          <Controller
            name="email"
            rules={{
              required: "email is required",
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                variant="underlined"
                size="sm"
                type="email"
                onChange={onChange}
                value={value}
                label="Email"
                placeholder="Enter your email"
              />
            )}
          />
          <Errmsg err={errors} name="email" />
        </div>
        <div className="w-full">
          <Controller
            name="password"
            rules={{
              required: "password is required",
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                variant="underlined"
                onChange={onChange}
                value={value}
                width={"100px"}
                size="sm"
                placeholder="Enter your password"
                endContent={
                  pass ? (
                    <FaRegEye
                      onClick={() => setPass(!pass)}
                      className="cursor-pointer text-purple-400"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setPass(!pass)}
                      className="cursor-pointer text-purple-400"
                    />
                  )
                }
                label="Password"
                type={!pass ? "password" : "text"}
              />
            )}
          />
          <Errmsg err={errors} name="password" />
        </div>
        {/* btn  */}
        <div className="flex w-full mt-3 justify-end">
          <Button type="submit" color="secondary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
