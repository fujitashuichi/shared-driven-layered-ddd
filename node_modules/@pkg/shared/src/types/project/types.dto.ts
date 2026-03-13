import z from "zod";
import { ProjectSchema } from "./types.data.js";

export const PostProjectRequestSchema = ProjectSchema.pick({
  title: true,
  description: true,
}).strict();
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;
