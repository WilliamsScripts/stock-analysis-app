import { z } from "zod";

export const validationParser = (data: unknown, schema: z.ZodSchema) => {
  const validatedFields = schema.safeParse(data);
  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors };
  }
  return { success: true, data: validatedFields.data };
};