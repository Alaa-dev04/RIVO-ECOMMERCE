"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { RegisterSchema, RegisterSchemaType } from "@/zod/registeration";

const useRegister = () => {
  const router = useRouter();

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

  const mutation = useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Register Data:", data);

      // Simulate success response
      return {
        message: "User created successfully",
      };
    },

    onSuccess: () => {
      toast.success("Account created successfully!");
      form.reset();
      router.push("/login/email");
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit = (data: RegisterSchemaType) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};

export default useRegister;