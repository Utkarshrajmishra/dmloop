import { z } from "zod";

const ArenaSchema = z.object({
  code: z
    .string()
    .min(3, { message: "Should be atleast 3 characters long" })
    .max(8, { message: "Should not be more than 8 characters long" })
    .trim(),
  mode: z.string().default("20").optional(),
});

export type ArenaSchemaTypes = {
  code?: string;
  mode?: string;
  errors?:{
    code?:string[];
    mode?:string[]
  }
};

export async function handleForm(
  _prevSate: ArenaSchemaTypes,
  formData: FormData
) {
  const code = formData.get("code") as string;
  const mode = formData.get("mode") as string;

  const validatedFields = ArenaSchema.safeParse({
    code,
    mode,
  });

  if (!validatedFields.success) {
    return {
      code,
      mode,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { code, mode };
}
