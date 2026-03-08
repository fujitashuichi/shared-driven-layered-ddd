import z from "zod";
import { ProjectSchema } from "./types.data.js";

export const PostProjectRequestSchema = ProjectSchema.pick({
  userId: true,
  title: true,
  description: true,
}).strict();
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;

export const GetProjectsRequestSchema = ProjectSchema.pick({
  userId: true
}).strict();
export type GetProjectsRequest = z.infer<typeof GetProjectsRequestSchema>
