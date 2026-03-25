import z from "zod";
export declare const PostProjectRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodString>;
}, z.z.core.$strict>;
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;
export declare const PostProjectResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodUUID;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodString>;
    createdAt: z.z.ZodISODate;
    updatedAt: z.z.ZodISODate;
}, z.z.core.$strip>;
export type PostProjectResponse = z.infer<typeof PostProjectResponseSchema>;
export declare const GetProjectsResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodUUID;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodString>;
    createdAt: z.z.ZodISODate;
    updatedAt: z.z.ZodISODate;
}, z.z.core.$strip>>;
export type GetProjectsResponse = z.infer<typeof GetProjectsResponseSchema>;
export declare const PatchProjectRequestSchema: z.ZodPipe<z.ZodObject<{
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodString>;
}, z.z.core.$strip>, z.ZodTransform<{
    title?: {
        set: string;
    } | undefined;
    description?: {
        set: string | null;
    } | undefined;
    status?: {
        set: string | null;
    } | undefined;
}, {
    title: string;
    description: string | null;
    status: string | null;
}>>;
export type PatchProjectRequest = z.infer<typeof PatchProjectRequestSchema>;
export declare const PatchProjectResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodUUID;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodString>;
    createdAt: z.z.ZodISODate;
    updatedAt: z.z.ZodISODate;
}, z.z.core.$strip>;
export type PatchProjectResponse = z.infer<typeof PatchProjectResponseSchema>;
export declare const DeleteProjectRequestSchema: z.ZodUndefined;
export type DeleteProjectResult = z.infer<typeof DeleteProjectRequestSchema>;
export declare const DeleteProjectResponseSchema: z.ZodUnion<[z.ZodObject<{}, z.z.core.$strip>, z.ZodVoid]>;
export type DeleteProjectResponse = z.infer<typeof DeleteProjectResponseSchema>;
