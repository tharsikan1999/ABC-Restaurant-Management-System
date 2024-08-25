import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { RegisterSchema } from "../../validation/RegisterSchema";
import Button from "../common/Button";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";

type FormFields = z.infer<typeof RegisterSchema>;

interface LoginProps {
  toggleMode: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

function Register({ toggleMode, setIsOpen }: LoginProps) {
  axios.defaults.withCredentials = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }
      );

      if (response.status === 201) {
        setIsOpen(false);
        toast.success("User Creation successful");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 409 &&
          error.response.data.message === "User already exists"
        ) {
          toast.error("Email is already created ");
        }
      } else {
        toast.error("User Creation failed");
      }
    }
  };
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className=" z-50 w-[700px] py-10 "
    >
      <div className="flex flex-col items-center justify-center6 py-8 mx-auto  lg:py-0">
        <div className=" bg-[#1F2937] bg-opacity-50 rounded-lg w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-white">
              Register to your account
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
                      errors.name ? errors.name.message : "Enter Your Full Name"
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
                      errors.phone ? errors.phone.message : "Enter Phone Number"
                    }
                  />
                  {errors.phone && (
                    <div className="text-red-500 mt-2 mb-5">
                      {errors.phone.message}
                    </div>
                  )}
                </div>
              </Fade>
              <Fade direction="up" triggerOnce>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    name="password"
                    id="password"
                    className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ${
                      errors.password
                        ? " text-red-500 placeholder-red-500"
                        : "text-gray-900"
                    }`}
                    placeholder={"••••••••"}
                  />
                  {errors.password && (
                    <div className="text-red-500 mt-2 mb-5">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </Fade>
              <Fade direction="up" triggerOnce>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ${
                      errors.confirmPassword
                        ? " text-red-500 placeholder-red-500"
                        : "text-gray-900"
                    }`}
                    placeholder={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : "••••••••"
                    }
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-500 mt-2 mb-5">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
              </Fade>
              <div className=" w-full flex justify-center">
                <Button
                  text="Sign Up"
                  loadingText={"SignUp.."}
                  isSubmitting={isSubmitting}
                  className=" mt-[0.25rem] sm:text-base hover:scale-100 ml-1 font-semibold  rounded-lg px-8 py-[0.6238rem] text-center mb-2"
                />
              </div>
              <Fade direction="up" triggerOnce>
                <div className=" flex gap-3 text-gray-200 cursor-pointer">
                  <p className="text-[1rem] font-light text-gray-200 dark:text-gray-400">
                    Already have an account?{" "}
                  </p>
                  <p
                    onClick={toggleMode}
                    className="font-medium text-primary-600 hover:underline text-[1rem] dark:text-primary-500"
                  >
                    Login
                  </p>
                </div>
              </Fade>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
