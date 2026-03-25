import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
export declare const UserWithoutTimeSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
}, z.core.$strip>;
export type UserWithoutTime = z.infer<typeof UserWithoutTimeSchema>;
