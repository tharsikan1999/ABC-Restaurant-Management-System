import useAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import Spinner from "../../animation/Spinner";
import { useQuery } from "@tanstack/react-query";
import {
  FetchAllOrderByUserId,
  FetchAllOrderItemData,
} from "../../api/order/Api";
import UseAuthProvider from "../../Hooks/UseAuthProvider";

const OrderTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = UseAuthProvider();

  const isUser = auth.role === "USER";

  const {
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    data: ordersData,
    error: ordersError,
  } = useQuery({
    queryKey: ["OrdersData", auth.role],
    queryFn: () =>
      isUser
        ? FetchAllOrderByUserId(axiosPrivate, auth.userDbId)
        : FetchAllOrderItemData(axiosPrivate),
    enabled: !!auth.role,
  });

  if (isOrdersLoading) return <Spinner />;
  if (isOrdersError) return `Error: ${ordersError.message}`;
  return (
    <div className="">
      <p className=" font-bold text-2xl text-slate-600/70 text-center mb-5 mt-10">
        Order Details
      </p>
      <div className="relative overflow-x-auto w-full  shadow-md mx-auto rounded-md">
        <table className="min-w-full text-left overflow-scroll border-collapse shadow-lg bg-white dark:bg-CustomBlack">
          <thead className="text-customGreen whitespace-nowrap bg-CustomLightBlue dark:bg-[#26292B] dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Item
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                User Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersData?.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              ordersData?.map((item, index: number) => (
                <tr
                  key={index}
                  className={`dark:bg-[#1E2021] whitespace-nowrap dark:text-gray-400  dark:hover:text-gray-800 hover:bg-gradient-to-r hover:from-blue-300 hover:via-blue-200 cursor-pointer hover:to-blue-300  hover:dark:bg-gradient-to-r hover:dark:from-gray-100 hover:dark:via-white hover:dark:to-gray-100 hover:dark:cursor-pointer transition-colors duration-200 text-[0.9rem] font-normal text-customGreen ${
                    index % 2 === 0
                      ? ""
                      : " bg-customPurple dark:bg-[#26292B] dark:text-gray-400  "
                  }`}
                >
                  <>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.item.name}</td>
                    <td className="px-6 py-4">{item.item.price}</td>
                    <td className="px-6 py-4">{item.address}</td>
                    <td className="px-6 py-4">{item.orderDate}</td>
                    <td className="px-6 py-4">{item.user.name}</td>
                    <td className="px-6 py-4">{item.user.email}</td>
                    <td className="px-6 py-4">{item.user.phone}</td>
                  </>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
