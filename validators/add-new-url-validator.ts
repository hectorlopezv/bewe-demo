import { z } from "zod";
export const LinkValidator = z.object({
  name: z.string().min(1).nonempty(),
  url: z.string().nonempty().url(),
});
export type LinkValidatorType = z.infer<typeof LinkValidator>;
