import { useState } from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import AddUser from "../components/form/AddUser";
import AddItem from "../components/form/AddItem";
import StaffTable from "../components/table/StaffsTable";
import ItemsTable from "../components/table/ItemsTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  return (
    <div className="w-full min-h-screen relative">
      <AddUser isOpen={isOpen} setIsOpen={setIsOpen} />
      <AddItem isOpen={isItemOpen} setIsOpen={setIsItemOpen} />
      <div className="max-w-max1366  mx-auto w-full flex  flex-col z">
        <div className=" h-20 flex justify-between items-center">
          <p
            className=" text-slate-700 font-semibold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            ABC Restaurant
          </p>
          <div className=" h-full flex items-center space-x-5">
            <Button text="Add User" onClick={() => setIsOpen(true)} />
            <Button text="Add Item" onClick={() => setIsItemOpen(true)} />
          </div>
        </div>
        <StaffTable />
        <ItemsTable />
      </div>
    </div>
  );
};

export default Dashboard;
