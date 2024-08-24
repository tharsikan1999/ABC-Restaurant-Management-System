import { useState } from "react";
import Button from "../../components/common/Button";
import AuthModal from "../AuthModal";
import Contact from "../contact";
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
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/form/OrderItem";
import UseAuthProvider from "../../Hooks//UseAuthProvider";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import axios from "axios";

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

const HomePge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isOderOpen, setIsOrderOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = UseAuthProvider();
  const cookies = new Cookies();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {});
      localStorage.removeItem("user-storage");
      cookies.remove("authToken");
      toast.success("Logged Out Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      {auth.accessToken ? null : (
        <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Contact isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      <OrderItem isOpen={isOderOpen} setIsOpen={setIsOrderOpen} />
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
          {pizzas.map((pizza, index) => (
            <div key={index} className="">
              <div
                className="w-full rounded-md h-52 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${pizza.image})`,
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
                <Button text="Order Now" onClick={() => setIsOrderOpen(true)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePge;
