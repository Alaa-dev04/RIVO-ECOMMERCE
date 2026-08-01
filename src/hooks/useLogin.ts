"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginSchema, LoginSchemaType } from "@/zod/login";
import { signIn } from "next-auth/react";
const useLogin = () => {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false || undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Login Data:", data);

      // Simulate success response
      return { message: "Logged in successfully" };
    },

    onSuccess: () => {
      
      form.reset();
      router.push("/home");

      setTimeout(() => {
        toast.success("Logged in successfully");
      }, 200);
      
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};
export default useLogin;
