interface Item {
  item: string;
  price: number;
  orderDate: string;
  deliveryDate: string;
  phone: string;
  address: string;
}

const orders = [
  {
    item: "Margherita",
    price: 1200,
    orderDate: "2021-09-01",
    deliveryDate: "2021-09-01",
    phone: "123456789",
    address: "Kathmandu",
  },
  {
    item: "Pepperoni",
    price: 1400,
    orderDate: "2021-09-01",
    deliveryDate: "2021-09-01",
    phone: "123456789",
    address: "Kathmandu",
  },
  {
    item: "Hawaiian",
    price: 1500,
    orderDate: "2021-09-01",
    deliveryDate: "2021-09-01",
    phone: "123456789",
    address: "Kathmandu",
  },
  {
    item: "Veggie",
    price: 1300,
    orderDate: "2021-09-01",
    deliveryDate: "2021-09-01",
    phone: "123456789",
    address: "Kathmandu",
  },
];

const OrderTable = () => {
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
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Date
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              orders.map((item: Item, index: number) => (
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
                    <td className="px-6 py-4">{item.item}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.orderDate}</td>
                    <td className="px-6 py-4">{item.deliveryDate}</td>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4">{item.address}</td>
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
