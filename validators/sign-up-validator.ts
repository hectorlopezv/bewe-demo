import { z } from "zod";
export const SignUpValidator = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z
    .string()
    .nonempty({
      message: "Password is required",
    })
    .min(1)
    .max(16),
  // .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
  //   message:
  //     "Password must be 6-16 characters long and contain at least one number, one letter and one unique character such as !@#$%^&*",
  // }),
});
export type SignUpValidatorType = z.infer<typeof SignUpValidator>;
