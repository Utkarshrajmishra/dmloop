import { z } from "zod";
import { redirect } from "next/navigation";

const ArenaSchema = z.object({
  code: z
    .string()
    .min(5, { message: "Should be 5 characters long" })
    .max(5, { message: "Should not be more than 5 characters long" })
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
  formData: FormData,
  session:any,
) {

  if(!session){
    return{
      error:{
        code: ['Login is required.']
      }
    }
  }

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

  return redirect(`/multiplayer/war/${code}`)

    // return {
    //   code,
    //   mode,
    //   error:{
    //     code:['Success']
    //   }
    // };
}
