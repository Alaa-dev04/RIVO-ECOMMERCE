// lib/api/types.ts

// ---- Requests ----
export interface RegisterRequest {
  FirstName: string;
  LastName: string;
  email: string;
  phone:number;
  password: string;
  ConfirmPassword:string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyPasswordRequest {
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  // adjust once we confirm actual field name
  newPassword: string;
  ConfirmPassword:string;
}

// ---- Responses ----
export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string; // present only if backend returns a bearer token instead of a cookie
}

export interface MessageResponse {
  message: string;
}

export interface VerifyPasswordResponse {
  resetToken: string;
}