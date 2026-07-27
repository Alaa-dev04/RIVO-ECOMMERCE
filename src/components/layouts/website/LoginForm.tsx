"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, Phone, Lock, ArrowRight, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import useLogin from "@/hooks/useLogin";

const LoginPage = () => {
  const params = useParams<{ method: string }>();
  const method = params.method === "phone" ? "phone" : "email"; // fallback to "email"

  const { form, onSubmit, isPending } = useLogin();
  const errors = form.formState.errors;

  return (
    <div className="w-full max-w-[550px] mx-auto px-6 pt-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-1 mb-6">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your Rivo account
        </p>
      </div>

      {/* Tabs, driven by URL */}
      <div className="grid grid-cols-2 gap-1 bg-muted rounded-lg p-1 mb-6">
        <Link
          href="/login/email"
          className={`flex items-center justify-center gap-2 h-9 rounded-md text-sm font-medium transition-colors ${
            method === "email"
              ? "bg-background shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Mail className="w-4 h-4" />
          Email
        </Link>
        <Link
          href="/login/phone"
          className={`flex items-center justify-center gap-2 h-9 rounded-md text-sm font-medium transition-colors ${
            method === "phone"
              ? "bg-background shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Phone className="w-4 h-4" />
          Phone
        </Link>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Conditional field based on the URL segment */}
        {method === "email" ? (
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-9 py-5 mt-2 bg-[#F8F8F8]"
                {...form.register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+966  -  5X XXX XXXX"
                className="pl-9 py-5 mt-2 bg-[#F8F8F8]"
                {...form.register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        )}

        {/* Password stays the same either way */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-9 py-5 mt-2 bg-[#F8F8F8]"
              {...form.register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me / forgot password */}
        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center gap-2">
            <Checkbox
              className="w-[22px] h-[22px]"
              id="remember"
              checked={form.watch("rememberMe")}
              onCheckedChange={(checked) =>
                form.setValue("rememberMe", checked === true)
              }
            />
            <label htmlFor="remember" className=" text-muted-foreground">
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[#F97316] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-lg bg-[#F97316] hover:bg-orange-600 font-medium"
        >
          <LogIn className="w-4 h-4 ml-2" />
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      {/* Divider */}
      <div className="flex items-center gap-3 my-7 w-full">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          or 
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
};

export default LoginPage;
