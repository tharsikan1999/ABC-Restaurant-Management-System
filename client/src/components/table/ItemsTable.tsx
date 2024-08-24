import PizzaImg from "../../../public/Images/pizzaImg.jpg";
import BBQ_Chicken from "../../../public/Images/BBQ_Chicken.jpg";
import Four_Cheese from "../../../public/Images/Four_Cheese.webp";
import Veggie_piza from "../../../public/Images/Veggie_piza.jpg";
import Hawaiian from "../../../public/Images/Hawaiian.webp";
import Pepperoni from "../../../public/Images/Pepperoni.jpg";
import Supreme from "../../../public/Images/Supreme.jpg";
import Buffalo_Chicken from "../../../public/Images/Buffalo_Chicken.jpg";
import Meat_Lovers from "../../../public/Images/Meat_Lovers.jpg";
import Mediterranean from "../../../public/Images/Mediterranean.jpg";

interface Item {
  name: string;
  price: number;
  image: string;
}

const pizzas = [
  { name: "Margherita", price: 1200, image: PizzaImg },
  { name: "Pepperoni", price: 1400, image: Pepperoni },
  { name: "Hawaiian", price: 1500, image: Hawaiian },
  { name: "Veggie", price: 1300, image: Veggie_piza },
  { name: "BBQ Chicken", price: 1600, image: BBQ_Chicken },
  { name: "Four Cheese", price: 1700, image: Four_Cheese },
  { name: "Meat Lovers", price: 1800, image: Meat_Lovers },
  { name: "Buffalo Chicken", price: 1650, image: Buffalo_Chicken },
  { name: "Supreme", price: 1900, image: Supreme },
  { name: "Mediterranean", price: 1900, image: Mediterranean },
];

const ItemsTable = () => {
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
            </tr>
          </thead>
          <tbody>
            {pizzas.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              pizzas.map((item: Item, index: number) => (
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
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.price}</td>
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
