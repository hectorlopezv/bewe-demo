import { z } from "zod";
export const ProfileValidator = z.object({
  email: z.string().email().nonempty(),
  name: z.string().min(1),
  location: z.any(),

  // .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
  //   message:
  //     "Password must be 6-16 characters long and contain at least one number, one letter and one unique character such as !@#$%^&*",
  // }),
});
export type ProfileValidatorType = z.infer<typeof ProfileValidator>;
