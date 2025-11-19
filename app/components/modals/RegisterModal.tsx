"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../ui/Heading";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created successfully!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Staho" subTitle="Create an account" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <span>Already have an account?</span>
          <button
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
            className="text-neutral-800 font-semibold hover:underline cursor-pointer"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
