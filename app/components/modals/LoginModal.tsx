"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import Button from "../ui/Button";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

function LoginModal() {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }else if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subTitle="Login to your account" />
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
          <span>Dont have an account?</span>
          <button
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
            className="text-neutral-800 font-semibold hover:underline cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log In"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
