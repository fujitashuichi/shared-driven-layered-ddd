import z from "zod";
import { ProjectSchema } from "./types.data.js";
export const PostProjectRequestSchema = ProjectSchema.pick({
    title: true,
    description: true,
}).strict();
export const PostProjectResponseSchema = ProjectSchema;
export const GetProjectsResponseSchema = ProjectSchema.array();
// 更新可能にするプロパッティを設定する
export const PatchProjectRequestSchema = ProjectSchema.pick({
    title: true,
    description: true,
    status: true
}).partial();
export const PatchProjectResponseSchema = ProjectSchema;
export const DeleteProjectRequestSchema = z.undefined();
export const DeleteProjectResponseSchema = z.object({}).or(z.void());
