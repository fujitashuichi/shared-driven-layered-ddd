import { z } from "zod";
// register
export const RegisterRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const RegisterResponseSchema = z.void().or(z.object({}));
// login
export const IsLoggedInResponseSchema = z.object({
    success: z.literal(false),
    isLoggedIn: z.literal(false)
}).or(z.object({
    success: z.literal(true),
    isLoggedIn: z.literal(true)
}));
export const LoginRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const LoginResponseSchema = z.void().or(z.object({}));
