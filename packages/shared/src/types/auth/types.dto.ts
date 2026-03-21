import { z } from "zod";
import { UserSchema } from "../user/types.data.js";

// register
export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = UserSchema;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

// session
export const SessionResponseSchema = UserSchema.pick({
  id: true,
  email: true
});
export type SessionResponse = z.infer<typeof SessionResponseSchema>;

// login
export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.void().or(z.object({}));
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// logout
export const LogoutResponseSchema = z.void().or(z.object({}));
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

// me
export const MeResponseSchema = UserSchema;
export type MeResponse = z.infer<typeof MeResponseSchema>;
