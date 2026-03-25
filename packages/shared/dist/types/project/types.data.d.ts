import z from "zod";
export declare const ProjectSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodUUID;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodString>;
    createdAt: z.z.ZodISODate;
    updatedAt: z.z.ZodISODate;
}, z.z.core.$strip>;
export type Project = z.infer<typeof ProjectSchema>;
