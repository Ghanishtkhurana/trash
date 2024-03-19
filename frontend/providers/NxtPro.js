import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const NxtPro = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NxtPro;
