import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { LoginSchema } from "../../validation/LoginSchema";
import Button from "../common/Button";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";
import { decodeToken } from "../../utils/JwtDecode";
import UseAuthProvider from "../../Hooks/UseAuthProvider";
import useUserStore from "../../store/userDetailsSlice";

type FormFields = z.infer<typeof LoginSchema>;

interface LoginProps {
  toggleMode: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

function Login({ toggleMode, setIsOpen }: LoginProps) {
  axios.defaults.withCredentials = true;
  const { setAuth } = UseAuthProvider();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.status === 200) {
        setIsOpen(false);
        toast.success("Login successful");
        const accessToken = response.data.accessToken;

        const decodeJwt = decodeToken(accessToken);
        console.log(decodeJwt);

        setAuth({
          role: decodeJwt.role,
          accessToken: accessToken,
          userId: decodeJwt.id,
          email: decodeJwt.email,
          userName: decodeJwt.name,
          phone: decodeJwt.phone,
          userDbId: decodeJwt.id,
        });

        setCurrentUser({
          email: decodeJwt.email,
          userName: decodeJwt.name,
          phone: decodeJwt.phone,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 404 &&
          error.response.data.errorMessage === "User not found"
        ) {
          toast.error("User not found");
        }
        if (
          error.response.status === 401 &&
          error.response.data.errorMessage === "Invalid credentials"
        ) {
          toast.error("Password is incorrect");
        }
      } else {
        toast.error("User Creation failed");
      }
    }
  };

  return (
    <>
      <section
        onClick={(e) => e.stopPropagation()}
        className=" z-50 w-[43.75rem] py-10 "
      >
        <div className="flex flex-col items-center justify-center6 py-8 mx-auto  lg:py-0">
          <div className=" bg-[#1F2937] bg-opacity-50 rounded-lg w-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Fade direction="up" triggerOnce>
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-gray-200">
                  Sign in to your account
                </h1>
              </Fade>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <Fade direction="up" triggerOnce>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-gray-200"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                      })}
                      type="text"
                      name="email"
                      id="email"
                      className={`bg-gray-50 remove-arrow border border-gray-300 sm:text-sm  outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                        errors.email
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                      placeholder={
                        errors.email ? errors.email.message : "Enter your Email"
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
                      htmlFor="password"
                      className="block mb-2 text-[1rem] font-medium text-gray-200 dark:text-gray-200"
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
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 sm:text-sm outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                        errors.password
                          ? " text-red-500 placeholder-red-500"
                          : "text-gray-900"
                      }`}
                    />
                    {errors.password && (
                      <div className="text-red-500 mt-2 mb-5">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </Fade>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        {...register("rememberMe")}
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border mt-1 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-[1rem] ">
                      <Fade direction="up" triggerOnce>
                        <label
                          htmlFor="remember"
                          className="text-gray-200 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </Fade>
                    </div>
                  </div>
                  <Fade direction="up" triggerOnce>
                    <p className="text-[1rem] text-gray-200 text font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Forgot password?
                    </p>
                  </Fade>
                </div>

                <div className=" w-full flex justify-center">
                  <Button
                    text="Sign in"
                    loadingText={"SignIn.."}
                    isSubmitting={isSubmitting}
                    className=" mt-[0.25rem] sm:text-base hover:scale-100 ml-1 font-semibold  rounded-lg px-8 py-[0.6238rem] text-center mb-2"
                  />
                </div>
                <Fade direction="up" triggerOnce>
                  <div className="flex gap-2 cursor-pointer">
                    <p className="text-[1rem]font-light  text-gray-200 dark:text-gray-400">
                      Don’t have an account yet?
                    </p>
                    <div
                      onClick={toggleMode}
                      className="font-medium text-gray-200 hover:underline text-[1rem] dark:text-primary-500"
                    >
                      Sign up
                    </div>
                  </div>
                </Fade>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
