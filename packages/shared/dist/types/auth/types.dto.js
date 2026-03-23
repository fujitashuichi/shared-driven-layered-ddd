import { z } from "zod";
import { UserSchema } from "../user/types.data.js";
// register
export const RegisterRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const RegisterResponseSchema = UserSchema;
// session
export const SessionResponseSchema = UserSchema.pick({
    id: true,
    email: true
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
