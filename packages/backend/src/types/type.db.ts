import { PatchProjectRequestSchema, ProjectSchema, schemaTransformer, UserSchema } from "@pkg/shared";
import { z } from "zod";

export const DbUserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  password_hash: z.string(),
  created_at: z.number().int().positive()
});
export type DbUser = z.infer<typeof DbUserSchema>;

const SaveUserPayloadSchema = UserSchema.omit({ id: true }).extend({ passwordHash: z.string() });
export type SaveUserPayload = z.infer<typeof SaveUserPayloadSchema>


export const SaveProjectPayloadSchema = ProjectSchema.omit({ id: true });
export type SaveProjectPayload = z.infer<typeof SaveProjectPayloadSchema>;

export const UpdateProjectPayloadSchema = PatchProjectRequestSchema
  .transform(schemaTransformer.toPrismaUpdate);
export type UpdateProjectPayload = z.infer<typeof UpdateProjectPayloadSchema>;
