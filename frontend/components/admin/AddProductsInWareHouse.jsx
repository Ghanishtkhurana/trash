import Errmsg from "@/core/Errmsg";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const AddProductsInWareHouse = ({onClose}) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const onSubmit = async (data) => {
        console.log(data);
      };
      return (
        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Name is Required" }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div>
                      <Input size="none" radius="none" onChange={onChange} value = {value} placeholder="Name Of Product" />
                      <Errmsg name="name" err={errors} />
                    </div>
                  );
                }}
              />
            </div>
            <div>
            <Controller
              control={control}
              name="quantity"
              rules={{ required: "Quantity is Required" }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div>
                    <Input type="number" size="none" radius="none" onChange={onChange} value = {value} placeholder="Quantity Of Product" />
                    <Errmsg name="quantity" err={errors} />
                  </div>
                );
              }}
            />
          </div>
          <div>
          <Controller
            control={control}
            name="price"
            rules={{ required: "Price is Required" }}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <Input type="number" size="none" radius="none" onChange={onChange} value = {value} placeholder="Price Of Product" />
                  <Errmsg name="price" err={errors} />
                </div>
              );
            }}
          />
        </div>
            <div className="flex gap-4">
              <Button  color="danger" onClick={() => onClose()}>Cancel</Button>
              <Button color="primary" type="submit">Add</Button>
            </div>
          </form>
        </div>
      );
}

export default AddProductsInWareHouse
