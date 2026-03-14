import { ProjectSchema } from "./types.data.js";
export const PostProjectRequestSchema = ProjectSchema.pick({
    title: true,
    description: true,
}).strict();
// 更新可能にするプロパッティを設定する
export const PatchProjectRequestSchema = ProjectSchema.pick({
    title: true,
    description: true,
    status: true
}).partial();
