// lib/api/auth.ts
import { api } from "./clients";
import type {
  RegisterRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
  LoginRequest,
  ForgetPasswordRequest,
  VerifyPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  MessageResponse,
  VerifyPasswordResponse,
} from "./types";

export const register = (data: RegisterRequest) =>
  api<MessageResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyOtp = (data: VerifyOtpRequest) =>
  api<MessageResponse>("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resendOtp = (data: ResendOtpRequest) =>
  api<MessageResponse>("/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: LoginRequest) =>
  api<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const forgetPassword = (data: ForgetPasswordRequest) =>
  api<MessageResponse>("/auth/forget-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyPassword = (data: VerifyPasswordRequest) =>
  api<VerifyPasswordResponse>("/auth/verify-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetPassword = (data: ResetPasswordRequest) =>
  api<MessageResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
