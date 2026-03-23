import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
    createdAt: z.ZodDate;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
