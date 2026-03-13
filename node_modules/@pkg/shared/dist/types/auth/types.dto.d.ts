import { z } from "zod";
export declare const RegisterRequestSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export declare const RegisterResponseSchema: z.ZodUnion<[z.ZodVoid, z.ZodObject<{}, z.core.$strip>]>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export declare const SessionResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodEmail;
}, z.core.$strip>;
export type SessionResponse = z.infer<typeof SessionResponseSchema>;
export declare const LoginRequestSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export declare const LoginResponseSchema: z.ZodUnion<[z.ZodVoid, z.ZodObject<{}, z.core.$strip>]>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
