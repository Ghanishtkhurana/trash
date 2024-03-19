import { setNavVal } from "@/slice/adminSlice";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdWarehouse } from "react-icons/md";
import { useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";

const mapList = [
  { name: "Warehouse", val: "warehouse", icon: MdWarehouse },
  { name: "UserPanel", val: "user_panel", icon: FaUsers },
];

const AdminSidebar = () => {
  const dispatch = useDispatch();

  const handleTheNav = (val) => {
    dispatch(setNavVal(val));
  };
  return (
    <div className="h-full border-r border-gray-600">
      <div className="flex pl-10 gap-4 items-center h-[100px]">
        <div>
          <GrUserAdmin className="h-10 w-10 text-purple-500" />
        </div>
        <p className="font-semibold text-[28px]">Admin</p>
        <IoIosNotifications className="w-7 h-7"/>

      </div>
      {/* ui list  */}
      <div className="pl-4">
        {mapList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleTheNav(item.val)}
            className="flex items-center cursor-pointer gap-4 p-4"
          >
            <item.icon className="h-6 w-6 text-purple-500" />
            <p className="">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
