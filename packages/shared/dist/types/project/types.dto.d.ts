import z from "zod";
import { ProjectSchema } from "./types.data.js";
export declare const PostProjectRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.z.core.$strict>;
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;
export type GetProjectsResponse = z.infer<typeof ProjectSchema>;
