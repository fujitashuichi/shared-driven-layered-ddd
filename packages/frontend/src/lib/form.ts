import type z from "zod";


type Result<T> =
  | { success: false, errorMessage: string }
  | { success: true, data: T }

export async function parseFormData<T extends z.ZodTypeAny>(
  formData: FormData,
  schema: T
): Promise<Result<z.infer<T>>> {
  const rawData = Object.fromEntries(formData);
  const parsed = schema.safeParse(rawData);
  if (!parsed.success) {
    console.info("invalidFormData:", rawData);
    console.info("parsed invalidFormData:", parsed);
    return {
      success: false,
      errorMessage: parsed.error.message
    }
  }

  return {
    success: true,
    data: parsed.data
  }
}