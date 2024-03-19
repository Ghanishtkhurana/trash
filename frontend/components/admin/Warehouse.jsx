import MyDialog from "@/core/DynamicModal";
import { Button, Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import AddWareHouse from "./AddWareHouse";
import AddProductsInWareHouse from "./AddProductsInWareHouse";

const Warehouse = () => {
  let isLoading = false;
  const [OpenAddWareHouse, setOpenAddWareHouse] = useState(false);
  const [OpenAddproduct, setOpenAddproduct] = useState(false);
  let data = [
    {
      name: "Warehouse 1",
      _id: "1",
      createdAt: "20/12/2003",
    },
  ];
  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          onClick={() => handleShiftToGroup(row._id)}
          className="hover:text-purple-400 duration-300 transition-all cursor-pointer"
        >
          {row.name}
        </div>
      ),
      width: "240px",
    },
    {
      name: "No of porducts",
      selector: (row) => <div>10</div>,
      width: "230px",
    },
    {
      name: "Created At",
      selector: (row) => <div>{dayjs("2003/12/22").format("DD MMM YYYY")}</div>,
      width: "230px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-4 ">
          <Button
            onClick={() => setOpenAddproduct(true)}
            className="text-[12px]"
            size="sm"
            color="secondary"
          >
            Add Product
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="h-full w-full p-10">
      {OpenAddWareHouse && (
        <MyDialog
          width="w-[400px]"
          heading="Add Ware House"
          show={OpenAddWareHouse}
          closeModal={() => setOpenAddWareHouse(false)}
        >
          <AddWareHouse onClose={() => setOpenAddWareHouse(false)} />
        </MyDialog>
      )}
      {OpenAddproduct && (
        <MyDialog
          width="w-[400px]"
          heading="Add Product"
          show={OpenAddproduct}
          closeModal={() => setOpenAddproduct(false)}
        >
          <AddProductsInWareHouse onClose={() => setOpenAddWareHouse(false)} />
        </MyDialog>
      )}
      <div className="flex justify-between ">
        <p className="text-[30px] font-semibold">Warehouse</p>
        <Button
          onClick={() => (
            setOpenAddWareHouse(true), console.log(OpenAddWareHouse)
          )}
          color="secondary"
        >
          Add
        </Button>
      </div>
      {/* table */}
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={data}
          // selectableRows
          persistTableHead
          fixedHeader
          responsive
          // paginationServer
          fixedHeaderScrollHeight="450px"
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          noDataComponent={
            <div className="flex flex-col items-center justify-center p-4">
              {isLoading ? <Spinner /> : <p>No WareHouse</p>}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Warehouse;
