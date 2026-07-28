"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight,MoveRight, Mail ,LockKeyhole} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ---------- Zod Schema ----------
const ForgotPasswordSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

// ---------- Hook ----------
const useForgotPassword = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotPasswordSchemaType) => {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Forgot Password Data:", data);

      // Simulate success response
      return { message: "Reset code sent successfully" };
    },

    onSuccess: () => {
      toast.success("Reset code sent to your email!");
      form.reset();
      router.push("/forgetpassword/OTP");
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};

// ---------- Page ----------
const ForgotPasswordPage = () => {
  const { form, onSubmit, isPending } = useForgotPassword();
  const errors = form.formState.errors;

  const steps = [
    "We'll send a 6-digit code to your email",
    "Enter the code to verify your identity",
    "Create a new strong password",
  ];

  return (
    <div className="w-full  mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/login/email"
        className="inline-flex items-center gap-2  text-xl text-muted-foreground hover:text-foreground transition-colors mb-18"
      >
        <ArrowLeft size={32} className="w-4 h-4" />
        Back
      </Link>

      {/* Header */}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-[450px] ">
          {" "}
          <div className="flex flex-col items-center text-center gap-1 mb-6">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <LockKeyhole className="w-6 h-6" />
              Forgot your password?
            </div>
            <p className=" text-muted-foreground mt-1">
              No worries. Enter your email and we'll send you a reset code.
            </p>
          </div>{" "}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className=" font-medium">
                Email Address <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 py-6 my-2 bg-[#F8F8F8]"
                  {...form.register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 py-6 rounded-lg bg-[#F97316] hover:bg-orange-600 font-medium"
            >
              {isPending ? "Sending..." : "Send Reset Code"}
              <MoveRight size={40} className="  ml-2" />
            </Button>
          </form>{" "}
          {/* Steps */}
          <div className="flex flex-col gap-2 mt-5">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F97316] text-white tfont-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className=" text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>{" "}
          {/* Sign in link */}
          <p className="text-center text-muted-foreground mt-5">
            Remember your password?{" "}
            <Link
              href="/login/email"
              className="text-orange-500 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
