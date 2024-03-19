import Errmsg from "@/core/Errmsg";
import useCreateUser from "@/libs/mutations/auth/useCreateUser";
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
  const {mutate : signup} = useCreateUser()
  const [pass, setPass] = useState(false);

  const onSubmit = (data) => {
    console.log("data=>", data);
    signup(data)
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* name */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 justify-center items-center flex-col p-10 border-1 border-gray-700 rounded-md w-[400px]"
      >
        <div>
          <p className="text-[29px] font-semibold">Sign</p>
        </div>
        <div className="w-full ">
          <Controller
            name="firstname"
            rules={{
              required: "first name is required",
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                variant={"underlined"}
                onChange={onChange}
                value={value}
                label="First name"
                placeholder="Enter your first name"
              />
            )}
          />
          <Errmsg err={errors} name="first_name" />
        </div>
        <div className="w-full">
          <Controller
            name="lastname"
            rules={{
              required: "last name is required",
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                variant="underlined"
                size={"sm"}
                onChange={onChange}
                value={value}
                label="last name"
                placeholder="Enter your last name"
              />
            )}
          />
          <Errmsg err={errors} name="last_name" />
        </div>
        <div className="w-full">
          <Controller
            name="phone_number"
            rules={{
              required: "phone is required",
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                variant="underlined"
                size="sm"
                onChange={onChange}
                value={value}
                type="number"
                label="Phone"
                placeholder="Enter your Phone number"
              />
            )}
          />
          <Errmsg err={errors} name="phone_no" />
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
                placeholder="Enter your password"
                width={"100px"}
                size="sm"
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
          <Errmsg err={errors} name="first_name" />
        </div>
        {/* btn  */}
        <div className="flex w-full mt-3 justify-end">
          <Button type="submit" color="secondary">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
