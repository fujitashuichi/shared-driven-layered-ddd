import { z } from "zod";
import { UserSchema } from "../user/types.data.js";
// register
export const RegisterRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const RegisterResponseSchema = z.object({
    id: z.number(),
    email: z.email(),
    createdAt: z.number()
});
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
// logout
export const LogoutResponseSchema = z.void().or(z.object({}));
// me
export const MeResponseSchema = UserSchema;
