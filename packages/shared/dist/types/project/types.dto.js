import z from "zod";
import { ProjectSchema, ProjectWithoutTimeSchema } from "./types.data.js";
import { schemaTransformer } from "../lib/schemaTransformer.js";
export const PostProjectRequestSchema = ProjectWithoutTimeSchema.pick({
    title: true,
    description: true,
    status: true
}).strict();
export const PostProjectResponseSchema = ProjectSchema;
export const GetProjectsResponseSchema = ProjectSchema.array();
// 更新可能にするプロパッティを設定する
export const PatchProjectRequestSchema = ProjectWithoutTimeSchema.pick({
    title: true,
    description: true,
    status: true
}).transform(schemaTransformer.toPrismaUpdate);
export const PatchProjectResponseSchema = ProjectSchema;
export const DeleteProjectRequestSchema = z.undefined();
export const DeleteProjectResponseSchema = z.object({}).or(z.void());
