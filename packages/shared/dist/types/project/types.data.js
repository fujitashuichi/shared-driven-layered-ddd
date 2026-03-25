import z from "zod";
export const ProjectSchema = z.object({
    id: z.number().int(),
    userId: z.uuid(),
    title: z.string().min(1).max(30),
    description: z.string().max(100).nullable(),
    status: z.string().max(10).nullable(),
    createdAt: z.iso.date(),
    updatedAt: z.iso.date()
});
