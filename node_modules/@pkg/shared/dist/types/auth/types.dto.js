import { z } from "zod";
// register
export const RegisterRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const RegisterResponseSchema = z.void().or(z.object({}));
// session
export const SessionResponseSchema = z.object({
    id: z.number(),
    email: z.email()
});
// login
export const LoginRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const LoginResponseSchema = z.void().or(z.object({}));
