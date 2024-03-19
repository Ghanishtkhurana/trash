import AdminSidebar from "@/components/admin/AdminSidebar";
import UserPanel from "@/components/admin/UserPanel";
import Warehouse from "@/components/admin/Warehouse";
import RedirectPrivatePages from "@/redirects/RedirectToPrivate";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";

const Admin = () => {
  //   const pathname = "warehouse";
  const { navVal } = useSelector((store) => store.adminSlice);
  console.log("navVal", navVal);
  return (
    <div className="">
      <div className="flex">
        <div className="w-[300px] min-h-screen ">
          <AdminSidebar />
        </div>
        <div className="flex-1">
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
