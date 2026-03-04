import z from "zod";
export declare const ProjectSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, z.z.core.$strip>;
export type Projects = z.infer<typeof ProjectSchema>;
