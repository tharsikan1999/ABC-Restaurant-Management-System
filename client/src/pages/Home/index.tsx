import { useState } from "react";
import Button from "../../components/common/Button";
import AuthModal from "../AuthModal";
import Contact from "../contact";
import PizzaImg from "../../../public/Images/pizzaImg.jpg";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/form/OrderItem";
import UseAuthProvider from "../../Hooks//UseAuthProvider";
import Cookies from "universal-cookie";
import { useLogoutMutation } from "../../query/common/query";
import Spinner from "../../animation/Spinner";
import { FetchAllItemsData } from "../../api/item/Api";
import { useQuery } from "@tanstack/react-query";

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
  image: string;
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
    queryFn: () => FetchAllItemsData(),
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

  const handleOrder = (pizza: Item) => {
    if (auth.accessToken) {
      setIsOrderOpen(true);
      setPizza(pizza as Pizza);
    } else {
      setIsOpen(true);
    }
  };

  if (isLoading) return <Spinner />;

  if (isError) return `Error: ${error.message}`;

  return (
    <div className="w-full min-h-screen relative">
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
        <div className=" grid  grid-cols-5 pt-10 gap-x-6 gap-y-8 z-10">
          {AllItemsData?.map(
            (pizza, index) => (
              console.log(pizza),
              (
                <div key={index} className="">
                  <div
                    className="w-full rounded-md h-52 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${PizzaImg})`,
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
                  <div className="w-full flex justify-center mt-1">
                    <Button
                      text="Order Now"
                      onClick={() => handleOrder(pizza)}
                    />
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePge;
