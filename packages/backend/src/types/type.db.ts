import { PatchProjectRequestSchema, ProjectSchema, schemaTransformer, UserSchema } from "@pkg/shared";
import { z } from "zod";
import { ProjectWithoutTimeSchema } from "../../../shared/dist/types/project/types.data.js";
import { UserWithoutTimeSchema } from "../../../shared/dist/types/user/types.data.js";

export const DbUserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  password_hash: z.string(),
  created_at: z.number().int().positive()
});
export type DbUser = z.infer<typeof DbUserSchema>;

const SaveUserPayloadSchema = UserWithoutTimeSchema.omit({ id: true }).extend({ passwordHash: z.string() });
export type SaveUserPayload = z.infer<typeof SaveUserPayloadSchema>


export const SaveProjectPayloadSchema = ProjectWithoutTimeSchema.omit({ id: true });
export type SaveProjectPayload = z.infer<typeof SaveProjectPayloadSchema>;

export const UpdateProjectPayloadSchema = PatchProjectRequestSchema
  .transform((data) => {
    const result = schemaTransformer.toPrismaUpdate(data);
    return result as {
      [K in keyof typeof result as undefined extends typeof result[K] ? never : K]: typeof result[K]
    };
});
export type UpdateProjectPayload = z.infer<typeof UpdateProjectPayloadSchema>;
