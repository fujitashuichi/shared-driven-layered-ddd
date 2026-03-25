import { z } from "zod"


// passwordHashを含むデータ型は必ずBE側で定義する
// ここでは、FE/BE両方で使えるプロパッティだけを定義する
export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAt: z.iso.datetime()
});

export type User = z.infer<typeof UserSchema>;


export const UserWithoutTimeSchema = UserSchema.omit({
  createdAt: true
});

export type UserWithoutTime = z.infer<typeof UserWithoutTimeSchema>;
