import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Button from ".././common/Button";
import { Fade } from "react-awesome-reveal";
import { AddItemSchema } from "../../validation/AddItemSchema";
import useAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useAddItemMutation } from "../../query/item/query";
import UseAuthProvider from "../../Hooks/UseAuthProvider";
import { FetchAllItemsData } from "../../api/item/Api";
import { useQuery } from "@tanstack/react-query";

type FormFields = z.infer<typeof AddItemSchema>;

interface LoginProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AddItem({ isOpen, setIsOpen }: LoginProps) {
  const { mutateAsync: addItem } = useAddItemMutation();
  const { auth } = UseAuthProvider();
  axios.defaults.withCredentials = true;
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(AddItemSchema),
  });

  const { refetch } = useQuery({
    queryKey: ["AllItemsData"],
    queryFn: () => FetchAllItemsData(),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const finalData = {
      ...data,
      isAvailable: data.isAvailable || false, // Ensuring it is boolean
      userId: auth.userId,
    };
    try {
      await addItem({
        item: finalData,
        axiosPrivate,
        reset: () => {
          reset();
        },
        setIsOpen,
        refetch,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return isOpen ? (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed top-0 left-0 overflow-y-auto w-full z-20 max-h-[100dvh] h-full bg-slate-600 bg-opacity-70 flex items-center justify-center"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="z-50 w-full sm:w-[700px] max-h-[90vh] py-10 overflow-y-auto"
      >
        <div className="flex flex-col items-center justify-center6 py-8 mx-auto  lg:py-0">
          <div className=" bg-[#1F2937] bg-opacity-50 rounded-lg w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-white">
                Add Your Items
              </h1>
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
                      Item Name
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
                          : "Enter Your Item Name"
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
                      htmlFor="price"
                      className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-gray-200"
                    >
                      Item Price
                    </label>
                    <input
                      {...register("price", {
                        required: "price address is required",
                      })}
                      type="text"
                      name="price"
                      id="price"
                      className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                        errors.price
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                      placeholder={
                        errors.price ? errors.price.message : "Enter your price"
                      }
                    />
                    {errors.price && (
                      <div className="text-red-500 mt-2 mb-5">
                        {errors.price.message}
                      </div>
                    )}
                  </div>
                </Fade>

                <Fade direction="up" triggerOnce>
                  <div className="flex items-center">
                    <input
                      {...register("isAvailable")}
                      type="checkbox"
                      name="isAvailable"
                      id="isAvailable"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="isAvailable"
                      className="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                    >
                      Is Available
                    </label>
                  </div>
                </Fade>

                <div className=" w-full flex justify-center">
                  <Button
                    text="Add Item"
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

export default AddItem;
