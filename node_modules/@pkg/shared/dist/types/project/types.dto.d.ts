import z from "zod";
export declare const PostProjectRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.z.core.$strict>;
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;
