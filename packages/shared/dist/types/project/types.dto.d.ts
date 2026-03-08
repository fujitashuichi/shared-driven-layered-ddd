import z from "zod";
export declare const PostProjectRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    userId: z.ZodNumber;
}, z.z.core.$strict>;
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;
export declare const GetProjectsRequestSchema: z.ZodObject<{
    userId: z.ZodNumber;
}, z.z.core.$strict>;
export type GetProjectsRequest = z.infer<typeof GetProjectsRequestSchema>;
