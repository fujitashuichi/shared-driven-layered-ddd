import { ProjectSchema } from "./types.data.js";
export const PostProjectRequestSchema = ProjectSchema.pick({
    userId: true,
    title: true,
    description: true,
}).strict();
