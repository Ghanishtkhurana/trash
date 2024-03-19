import AdminSidebar from "@/components/admin/AdminSidebar";
import UserPanel from "@/components/admin/UserPanel";
import Warehouse from "@/components/admin/Warehouse";
import DistanceCal from "@/core/DistanceCal";
import RedirectPrivatePages from "@/redirects/RedirectToPrivate";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Admin = () => {
  const obj1 = {
    latitude: 37.7749,
    longitude: -122.4194,
  };
  const obj2 = {
    latitude: 40.7128,
    longitude: -74.006,
  };
  const [distance, setDistance] = useState(0);
  console.log("i",distance)
  const { navVal } = useSelector((store) => store.adminSlice);
  console.log("navVal", navVal);
  return (
    <div className="">
      <div className="flex">
        <div className="w-[300px] min-h-screen ">
          <AdminSidebar />
        </div>
        <div className="flex-1">
          <DistanceCal
            setter={setDistance}
            obj1={obj1}
            obj2={obj2}
          />

          {navVal === "warehouse" ? <Warehouse /> : <UserPanel />}
        </div>
      </div>
    </div>
  );
};

// export default Admin

export const getServerSideProps = async ({ req }) => {
  const decodedToken = req?.cookies?.learn
    ? jwtDecode(req?.cookies?.learn)
    : {};
  const RedirectToLogin = await RedirectPrivatePages({ decodedToken, req });
  if (RedirectToLogin) return RedirectToLogin;
  else if (decodedToken?.role !== "Admin") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default dynamic(() => Promise.resolve(Admin), { ssr: false });
