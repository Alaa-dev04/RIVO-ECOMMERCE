"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignUp } from "@/zod/auth/mutation";
import { RegisterSchema, RegisterSchemaType } from "@/zod/registeration";
import { SubmitHandler } from "react-hook-form";
const useRegister = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignUp();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
const onSubmit: SubmitHandler<RegisterSchemaType> = (values) => {
  mutate(
    {
      FirstName: values.firstName,
      LastName: values.lastName,
      email: values.email,
      phone: values.phone as any,
      password: values.password,
      ConfirmPassword: values.confirmPassword,
    },
    {
      onSuccess: () => {
        toast.success("Account created successfully!");

        form.reset();

        router.push("/register/optregister");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
};

  return {
    form,
    onSubmit,
    isPending,
  };
};

export default useRegister;
