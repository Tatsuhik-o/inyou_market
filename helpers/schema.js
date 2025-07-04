import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: "firstNameMin" })
    .max(50, { message: "firstNameMax" }),
  lastName: z
    .string()
    .min(4, { message: "lastNameMin" })
    .max(50, { message: "lastNameMax" }),
  email: z
    .string()
    .regex(
      /^(?!.*\.\.)(?!.*__)(?!.*--)(?!.*\.@)(?!.*_@)(?!.*-@)[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/,
      {
        message: "email",
      }
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@?;:,+°çè()&-])[a-zA-Z0-9!_@?;:,+°çè()&-]{8,}$/,
      {
        message: "password",
      }
    ),
  repeatPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@?;:,+°çè()&-])[a-zA-Z0-9!_@?;:,+°çè()&-]{8,}$/,
      {
        message: "repeatPassword",
      }
    ),
});
