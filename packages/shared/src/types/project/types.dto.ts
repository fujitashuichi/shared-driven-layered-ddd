import z from "zod";
import { ProjectSchema } from "./types.data.js";

export const PostProjectRequestSchema = ProjectSchema.pick({
  title: true,
  description: true,
}).strict();
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;


// 更新可能にするプロパッティを設定する
export const PatchProjectRequestSchema = ProjectSchema.pick({
  title: true,
  description: true,
  status: true
}).partial();
export type PatchProjectRequest = z.infer<typeof PatchProjectRequestSchema>;
