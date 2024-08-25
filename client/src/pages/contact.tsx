"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/common/Button";
import { ContactSchema } from "../validation/ContactSchema";
import { Fade } from "react-awesome-reveal";
import { useSendMailMutation } from "../query/email/query";
import useAxiosPrivate from "../Hooks/UseAxiosPrivate";

type FormValues = z.infer<typeof ContactSchema>;

interface ContactProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Contact = ({ isOpen, setIsOpen }: ContactProps) => {
  const { mutateAsync: sendEmail } = useSendMailMutation();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await sendEmail({
        contactInfo: data,
        axiosPrivate,
        reset: () => {
          reset();
        },
        setIsOpen,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return isOpen ? (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed top-0 left-0 overflow-y-auto z-20 w-full h-full bg-slate-600 bg-opacity-70 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className=" bg-[#1F2937] bg-opacity-50 rounded-lg w-full shadow dark:border md:mt-0 sm:max-w-xl dark:bg-gray-800 dark:border-gray-700 px-5 pb-10 pt-7"
      >
        <Fade direction="up" triggerOnce>
          <h1 className="text-xl -mt-2 text-center font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-gray-200">
            Contact Us
          </h1>
        </Fade>
        <div className="grid grid-cols-12 gap-3 pt-7">
          <div className="col-span-12 md:col-span-6">
            <Fade triggerOnce direction="up">
              <div>
                <label
                  htmlFor="Name"
                  className="mb-2 inline-block font-medium text-gray-200"
                >
                  Full name
                </label>
                <input
                  id="Name"
                  {...register("name")}
                  placeholder="Enter Your Full Name *"
                  className={`bg-gray-50 remove-arrow border border-gray-300 sm:text-sm  outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                    errors.name
                      ? " text-red-500 placeholder-red-500"
                      : "text-gray-900"
                  }`}
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-500 font-medium mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </Fade>
          </div>
          <div className="col-span-12 md:col-span-6">
            <Fade triggerOnce direction="up">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 text-gray-200 inline-block font-medium"
                >
                  Your Email
                </label>
                <input
                  id="Email"
                  {...register("email")}
                  placeholder="Enter Your Email *"
                  className={`bg-gray-50 remove-arrow border border-gray-300 sm:text-sm  outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                    errors.email
                      ? " text-red-500 placeholder-red-500"
                      : "text-gray-900"
                  }`}
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </Fade>
          </div>

          <div className="col-span-12">
            <Fade triggerOnce direction="up">
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 inline-block font-medium text-gray-200"
                >
                  Subject
                </label>
                <input
                  id="Subject"
                  {...register("subject")}
                  placeholder="Enter Your Subject *"
                  className={`bg-gray-50 remove-arrow border border-gray-300 sm:text-sm  outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                    errors.subject
                      ? " text-red-500 placeholder-red-500"
                      : "text-gray-900"
                  }`}
                  type="text"
                />
                {errors.subject && (
                  <p className="text-red-500 font-medium mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </Fade>
          </div>
          <div className="col-span-12">
            <Fade triggerOnce direction="up">
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 inline-block font-medium text-gray-200"
                >
                  Your message
                </label>
                <textarea
                  id="Message"
                  {...register("message")}
                  placeholder="Enter Your Message *"
                  rows={4}
                  className={`bg-gray-50 remove-arrow border border-gray-300 sm:text-sm  outline-none rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  ${
                    errors.message
                      ? " text-red-500 placeholder-red-500"
                      : "text-gray-900"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 font-medium mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </Fade>
          </div>
          <div className="col-span-12 mt-3 flex justify-center">
            <Fade triggerOnce direction="up">
              <div>
                <Button isSubmitting={isSubmitting} text="Submit Now" />
              </div>
            </Fade>
          </div>
        </div>
      </form>
    </div>
  ) : null;
};

export default Contact;
