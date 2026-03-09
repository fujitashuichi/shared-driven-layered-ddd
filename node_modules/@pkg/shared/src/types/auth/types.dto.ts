import { z } from "zod";

// register
export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.void().or(z.object({}));
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

// session
export const SessionResponseSchema = z.object({
  success: z.literal(false),
  user: z.null()
}).or(z.object({
  success: z.literal(true),
  user: z.object({
    id: z.number(),
    email: z.email()
  })
}));
export type SessionResponse = z.infer<typeof SessionResponseSchema>;

// login
export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.void().or(z.object({}));
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
