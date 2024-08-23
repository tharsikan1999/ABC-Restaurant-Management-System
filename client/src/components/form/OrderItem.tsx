import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Button from ".././common/Button";
import { Fade } from "react-awesome-reveal";
import { OrderItemSchema } from "../../validation/OrderItemSchema";

type FormFields = z.infer<typeof OrderItemSchema>;

interface LoginProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function OrderItem({ isOpen, setIsOpen }: LoginProps) {
  axios.defaults.withCredentials = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(OrderItemSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  };
  return isOpen ? (
    <div
      onClick={() => setIsOpen(false)}
      className="absolute top-0 left-0 w-full z-20 h-full bg-slate-600 bg-opacity-70 flex items-center justify-center"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className=" z-50 w-[700px] py-10 "
      >
        <div className="flex flex-col items-center justify-center6 py-8 mx-auto  lg:py-0">
          <div className=" bg-[#1F2937] bg-opacity-50 rounded-lg w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-white">
                Fill in the details
              </h1>
              <div className=" flex flex-col space-y-2">
                <div className="flex gap-3 text-gray-200 text-lg">
                  <p className="font-extrabold">Your Item :</p>
                  <p className=" font-semibold">Pepperoni</p>
                </div>
                <div className="flex gap-3 text-gray-200 text-lg  font-extrabold">
                  <p className="font-extrabold">Payment Method :</p>
                  <p className=" font-semibold">Cash on Delivery</p>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <Fade direction="up" triggerOnce>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-white"
                    >
                      Your Full Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      name="name"
                      id="name"
                      className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ${
                        errors.name
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                      placeholder={
                        errors.name
                          ? errors.name.message
                          : "Enter Your Full Name"
                      }
                    />
                    {errors.name && (
                      <div className="text-red-500 mt-2 mb-5">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                </Fade>
                <Fade direction="up" triggerOnce>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-gray-200"
                    >
                      Your Email Address
                    </label>
                    <input
                      {...register("email", {
                        required: "Email address is required",
                      })}
                      type="text"
                      name="email"
                      id="email"
                      className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                        errors.email
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                      placeholder={
                        errors.email ? errors.email.message : "Enter your email"
                      }
                    />
                    {errors.email && (
                      <div className="text-red-500 mt-2 mb-5">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </Fade>
                <Fade direction="up" triggerOnce>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-gray-200"
                    >
                      Your Phone Number
                    </label>
                    <input
                      {...register("phone", {
                        required: "Email address is required",
                      })}
                      type="text"
                      name="phone"
                      id="phone"
                      className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                        errors.phone
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                      placeholder={
                        errors.phone
                          ? errors.phone.message
                          : "Enter Phone Number"
                      }
                    />
                    {errors.phone && (
                      <div className="text-red-500 mt-2 mb-5">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                </Fade>

                <Fade triggerOnce direction="up">
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 inline-block font-medium text-gray-200"
                    >
                      Your Address
                    </label>
                    <textarea
                      id="address"
                      {...register("address")}
                      placeholder="Enter Your Address *"
                      rows={4}
                      className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                        errors.address
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 font-medium mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </Fade>

                <div className=" w-full flex justify-center">
                  <Button
                    text="Order Now"
                    loadingText={"Adding..."}
                    isSubmitting={isSubmitting}
                    className=" mt-[0.25rem] sm:text-base hover:scale-100 ml-1 font-semibold  rounded-lg px-8 py-[0.6238rem] text-center mb-2"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : null;
}

export default OrderItem;
