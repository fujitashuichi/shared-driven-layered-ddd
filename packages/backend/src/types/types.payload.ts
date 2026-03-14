import z from "zod";
import { PatchProjectRequestSchema, ProjectSchema, RegisterRequestSchema } from "@pkg/shared"

export const JWTPayloadSchema = RegisterRequestSchema.pick({ email: true });
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

export const UpdateProjectPayloadSchema = PatchProjectRequestSchema.extend({
  updatedAt: true
});
export type UpdateProjectPayload = z.infer<typeof UpdateProjectPayloadSchema>;
