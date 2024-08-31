import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Button from ".././common/Button";
import { Fade } from "react-awesome-reveal";
import { AddItemSchema } from "../../validation/AddItemSchema";
import { ImageSchema } from "../../validation/ImageSchema";
import useAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useAddItemMutation } from "../../query/item/query";
import UseAuthProvider from "../../Hooks/UseAuthProvider";
import { FetchAllItemsData } from "../../api/item/Api";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

type FormFields = z.infer<typeof AddItemSchema>;
type ImgFormFields = z.infer<typeof ImageSchema>;

interface LoginProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AddItem({ isOpen, setIsOpen }: LoginProps) {
  axios.defaults.withCredentials = true;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: addItem } = useAddItemMutation();
  const { auth } = UseAuthProvider();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset: resetFormFields,
  } = useForm<FormFields>({
    resolver: zodResolver(AddItemSchema),
  });

  const { reset: resetImageFields } = useForm<ImgFormFields>({
    resolver: zodResolver(ImageSchema),
  });

  const { refetch } = useQuery({
    queryKey: ["AllItemsData"],
    queryFn: () => FetchAllItemsData(),
  });

  const resetImageState = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!selectedImage) {
      setError("Please select an image to upload");
      return;
    }

    const finalData = {
      ...data,
      isAvailable: data.isAvailable ? data.isAvailable === "true" : false,
      userId: auth.userId,
    };
    try {
      await addItem({
        item: finalData,
        image: selectedImage,
        axiosPrivate,
        reset: () => {
          resetImageFields();
          resetFormFields();
          resetImageState();
        },
        setIsOpen,
        refetch,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const result = ImageSchema.pick({ file: true }).safeParse({ file });

    if (!result.success) {
      setError(result.error.errors[0].message);
      setSelectedImage(null);
      setImagePreview(null);
    } else {
      setError(null);
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
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
                    <select
                      {...register("isAvailable")}
                      name="isAvailable"
                      id="availability"
                      className="w-full h-10 text-gray-400 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 border-gray-300 rounded outline-none border-none px-3"
                    >
                      <option value="">Select Availability</option>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                  {errors.isAvailable && (
                    <div className="text-red-500 mt-2 mb-5">
                      {errors.isAvailable.message}
                    </div>
                  )}
                </Fade>
                <Fade direction="up" triggerOnce>
                  <div className="flex flex-col items-center justify-center w-full rounded-lg p-8">
                    <div className="relative flex flex-col items-center justify-center w-32 h-32 mb-4">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Item Preview"
                          className="rounded-lg w-32 h-32 object-cover"
                        />
                      ) : (
                        <img
                          src="/icons/cloud-computing.png"
                          alt="Avatar"
                          className="rounded-md w-32 h-32 object-cover"
                        />
                      )}
                      <label
                        htmlFor="dropzone-file"
                        className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md cursor-pointer text-white hover:bg-blue-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </label>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                      />
                    </div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG (MAX. 800x800px)
                    </p>
                  </div>
                </Fade>
                {error && (
                  <p className="text-red-500 text-[0.875rem] text-center font-semibold mt-[0.625rem]">
                    {error}
                  </p>
                )}
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
