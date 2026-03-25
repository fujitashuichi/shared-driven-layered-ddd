import z from "zod"

export const ProjectSchema = z.object({
  id: z.number().int(),
  userId: z.uuid(),
  title: z.string().min(1).max(30),
  description: z.string().max(100).nullable(),
  status: z.string().max(10).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});
export type Project = z.infer<typeof ProjectSchema>;


export const ProjectWithoutTimeSchema = ProjectSchema.omit({
  createdAt: true,
  updatedAt: true
});
export type ProjectWithoutTime = z.infer<typeof ProjectWithoutTimeSchema>;
