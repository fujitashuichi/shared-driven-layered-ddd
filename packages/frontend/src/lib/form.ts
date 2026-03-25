import type z from "zod";


type Result<T> =
  | { success: false, errorMessage: string }
  | { success: true, data: T }

type Props<T> = {
  formData: FormData,
  schema: T,
  useFor: "create" | "update" | "noEmptyValues"
}

export async function parseFormData<T extends z.ZodTypeAny>({
  formData, schema, useFor
}: Props<T>
): Promise<Result<z.infer<T>>> {
  const emptyValueMap = {
    create: null,
    update: undefined,
    noEmptyValues: ""
  } as const;

  const rawData = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      value === "" ? emptyValueMap[useFor] : value
    ])
  );

  const parsed = schema.safeParse(rawData);
  if (!parsed.success) {
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