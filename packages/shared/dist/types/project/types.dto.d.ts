import z from "zod";
export declare const PostProjectRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.z.core.$strict>;
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;
export declare const PatchProjectRequestSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.z.core.$strip>;
export type PatchProjectRequest = z.infer<typeof PatchProjectRequestSchema>;
