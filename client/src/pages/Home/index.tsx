import { useState } from "react";
import Button from "../../components/common/Button";
import AuthModal from "../AuthModal";
import Contact from "../contact";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/form/OrderItem";
import UseAuthProvider from "../../Hooks/UseAuthProvider";
import Cookies from "universal-cookie";
import { useLogoutMutation } from "../../query/common/query";
import Spinner from "../../animation/Spinner";
import { FetchAllItemsData } from "../../api/item/Api";
import { useQuery } from "@tanstack/react-query";
import PizzaImg from "../../../public/Images/pizzaImg.jpg";

interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const HomePge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [isOderOpen, setIsOrderOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = UseAuthProvider();
  const cookies = new Cookies();

  const {
    isLoading,
    isError,
    data: AllItemsData,
    error,
  } = useQuery({
    queryKey: ["AllItemsData"],
    queryFn: async () => {
      const items = await FetchAllItemsData();
      return items.map((item) => ({
        ...item,
        id: Number(item.id),
      }));
    },
  });

  const { mutateAsync: logout } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user-storage");
      cookies.remove("authToken");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = (item: Item) => {
    if (auth.accessToken) {
      setIsOrderOpen(true);
      setPizza(item as Pizza);
    } else {
      setIsOpen(true);
    }
  };

  if (isLoading) return <Spinner />;

  if (isError) return `Error: ${error.message}`;

  return (
    <div className="w-full min-h-screen relative  pb-20">
      {auth.accessToken ? null : (
        <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Contact isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      <OrderItem isOpen={isOderOpen} setIsOpen={setIsOrderOpen} pizza={pizza} />
      <div className="max-w-max1366  mx-auto w-full flex  flex-col z">
        <div className=" h-20 flex justify-between items-center">
          <p
            className=" text-slate-700 font-semibold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            ABC Restaurant
          </p>

          <div className=" h-full flex items-center space-x-5">
            {auth.accessToken ? null : (
              <Button text="Login" onClick={() => setIsOpen(true)} />
            )}
            <Button text="contact" onClick={() => setIsContactOpen(true)} />
            {auth.accessToken ? (
              <Button text="Dashboard" onClick={() => navigate("/dashboard")} />
            ) : null}
            {auth.accessToken ? (
              <Button text="LogOut" onClick={handleLogout} />
            ) : null}
          </div>
        </div>
        {AllItemsData?.length === 0 ? (
          <p className="text-center text-xl font-semibold mt-10 text-slate-800/90">
            No data available
          </p>
        ) : (
          <div className=" grid  grid-cols-5 pt-10 gap-x-6 gap-y-14 z-10">
            {AllItemsData?.map((pizza, index) => (
              <div key={index} className="">
                <div
                  className="w-full rounded-md h-52 bg-cover bg-center bg-no-repeat "
                  style={{
                    backgroundImage: `url(${pizza.imagePath || PizzaImg})`,
                  }}
                />
                <div className="w-full flex justify-between py-3 px-1">
                  <p className="font-semibold text-lg text-slate-800/90">
                    {pizza.name}
                  </p>
                  <p className="font-semibold text-lg text-slate-600/90">
                    RS. {pizza.price}
                  </p>
                </div>
                <button
                  className="w-full flex justify-center mt-1"
                  disabled={pizza.isAvailable ? false : true}
                >
                  <Button
                    text={`${
                      pizza.isAvailable ? "Order Now" : "Not Available"
                    }`}
                    onClick={() => handleOrder(pizza)}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePge;
