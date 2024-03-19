import useDeleteUser from "@/libs/mutations/admin/useDeleteUser";
import useUpdateUser from "@/libs/mutations/admin/useUserUpdate";
import useGetAllUsers from "@/libs/queries/useGetAllUsers";
import { Button, Input, Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

const UserPanel = () => {
  const [search, setSearch] = useState("");
  const {
    data: getAllUsers,
    isLoading: getAllUsersLoading,
    isError: getAllUsersError,
    isSuccess: getAllUsersSuccess,
  } = useGetAllUsers(search);
  const {
    mutate: ActionOn,
    isLoading: ActionOnLoading,
    isError: ActionOnError,
  } = useUpdateUser();
  const {
    mutate: deleteUser,
    isLoading: deleteUserLoading,
    isError: deleteUserError,
  } = useDeleteUser();
  console.log(getAllUsers);
  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div className="hover:text-purple-400 duration-300 transition-all cursor-pointer">
          {`${row.firstname} ${row.lastname}`}
        </div>
      ),
      width: "130px",
    },
    {
      name: "phone",
      selector: (row) => <div>7896541230</div>,
      width: "140px",
    },
    {
      name: "email",
      selector: (row) => <div>user@gmail.com</div>,
      width: "140px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-4 ">
          <Button
            variant={
              row?.status == "block" || row?.approve_status == false
                ? "solid"
                : "bordered"
            }
            color="danger"
            onClick={() => ActionOn({data : { status: "block" } , id : row?._id})}
            size="sm"
          >
            block
          </Button>
          <Button
            variant={row?.status == "delete" ? "solid" : "bordered"}
            onClick={() => deleteUser(row?._id)}
            color="danger"
            size="sm"
          >
            Delete
          </Button>
          <Button
            variant={
              row?.status == "active" || row?.approve_status
                ? "solid"
                : "bordered"
            }
            onClick={() => ActionOn({data : { status: "active" } , id : row?._id})}
            color="secondary"
            size="sm"
          >
            Active
          </Button>
          <Button
          color="primary"
            variant={
              row?.status == "active" || row?.approve_status
                ? "solid"
                : "bordered"
            }
            onClick={() => ActionOn({data : { approve_status: true } , id : row?._id})}
           
            size="sm"
          >
            Approved
          </Button>
          <Button
          color="danger"
            variant={
              row?.status == "block" || row?.approve_status == false
                ? "solid"
                : "bordered"
            }
            onClick={() => ActionOn({data : { approve_status: false },id : row?._id})}
          
            size="sm"
          >
            Disapproved
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="h-full w-full p-10">
      <div className="flex justify-between ">
        <p className="text-[30px] font-semibold">UserPanel</p>
        <Button color="secondary">Add</Button>
      </div>
      {/* table */}
      <div className="w-[300px] ">
        {" "}
        <Input
          onChange={(e) => setSearch(e.target.value)}
          variant="underlined"
          placeholder="Search"
        />
      </div>
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={
            !getAllUsersLoading && !getAllUsersError && getAllUsersSuccess
              ? getAllUsers
              : []
          }
          // selectableRows
          persistTableHead
          fixedHeader
          responsive
          // paginationServer
          fixedHeaderScrollHeight="450px"
          pagination
          // paginationRowsPerPageOptions={(!getAllUsersLoading && !getAllUsersError && getAllUsersSuccess) ?getAllUsers : []}
          noDataComponent={
            <div className="flex flex-col items-center justify-center p-4">
              {getAllUsersLoading ? <Spinner /> : <p>No UserPanel</p>}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(UserPanel), { ssr: false });
