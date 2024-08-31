import PizzaImg from "../../../public/Images/pizzaImg.jpg";
import Spinner from "../../animation/Spinner";
import { FetchAllItemsData } from "../../api/item/Api";
import { useQuery } from "@tanstack/react-query";

const ItemsTable = () => {
  const {
    isLoading,
    isError,
    data: AllItemsData,
    error,
  } = useQuery({
    queryKey: ["AllItemsData"],
    queryFn: () => FetchAllItemsData(),
  });

  if (isLoading) return <Spinner />;

  if (isError) return `Error: ${error.message}`;

  return (
    <div className="">
      <p className=" font-bold text-2xl text-slate-600/70 text-center mb-5 mt-10">
        Items Details
      </p>
      <div className="relative overflow-x-auto w-full  shadow-md mx-auto rounded-md">
        <table className="min-w-full text-left overflow-scroll border-collapse shadow-lg bg-white dark:bg-CustomBlack">
          <thead className="text-customGreen whitespace-nowrap bg-CustomLightBlue dark:bg-[#26292B] dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Is Available
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
            </tr>
          </thead>
          <tbody>
            {AllItemsData?.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              AllItemsData?.map((item, index: number) => (
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
                    <td className="px-6 py-4">
                      <img
                        src={item.imagePath || PizzaImg}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      {item.isAvailable ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">{item.user?.name}</td>
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

export default ItemsTable;
