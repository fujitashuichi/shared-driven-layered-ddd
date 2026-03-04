import z from "zod";
// UserはFEとBEで扱いが変わりやすいため、ここでは定義しない
export const ProjectSchema = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    title: z.string().min(1).max(30),
    description: z.string().max(100).optional(),
    status: z.string().max(10).optional(),
    createdAt: z.number(),
    updatedAt: z.number()
});
