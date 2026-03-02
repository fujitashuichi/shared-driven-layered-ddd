import { z } from "zod";

// register
export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.void().or(z.object({}));
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

// login
export const IsLoggedInResponseSchema = z.object({
  success: z.literal(false),
  isLoggedIn: z.literal(false)
}).or(z.object({
  success: z.literal(true),
  isLoggedIn: z.literal(true)
}));
export type IsLoggedInResponse = z.infer<typeof IsLoggedInResponseSchema>;

export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.void().or(z.object({}));
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
