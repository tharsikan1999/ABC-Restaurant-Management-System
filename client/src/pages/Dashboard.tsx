import { useState } from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import AddUser from "../components/form/AddUser";
import AddItem from "../components/form/AddItem";
import StaffTable from "../components/table/StaffsTable";
import ItemsTable from "../components/table/ItemsTable";
import UseAuthProvider from "../Hooks//UseAuthProvider";
import OrderTable from "../components/table/OrderTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const { auth } = UseAuthProvider();
  return (
    <div className="w-full min-h-screen relative">
      <AddUser isOpen={isOpen} setIsOpen={setIsOpen} />
      <AddItem isOpen={isItemOpen} setIsOpen={setIsItemOpen} />
      <div className="max-w-max1366  mx-auto w-full flex  flex-col pb-20">
        <div className=" h-20 flex justify-between items-center">
          <p
            className=" text-slate-700 font-semibold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            ABC Restaurant
          </p>
          <div className="h-full flex items-center space-x-5">
            {auth.role === "ADMIN" ? (
              <Button text="Add User" onClick={() => setIsOpen(true)} />
            ) : null}

            {auth.role === "ADMIN" || auth.role === "STAFF" ? (
              <Button text="Add Item" onClick={() => setIsItemOpen(true)} />
            ) : null}
          </div>
        </div>
        {auth.role === "ADMIN" ? (
          <>
            <StaffTable />
            <ItemsTable />
            <OrderTable />
          </>
        ) : null}

        {auth.role === "STAFF" ? (
          <>
            <ItemsTable />
            <OrderTable />
          </>
        ) : null}

        {auth.role === "USER" ? (
          <>
            <OrderTable />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
