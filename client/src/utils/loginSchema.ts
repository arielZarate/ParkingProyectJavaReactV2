import * as z from "zod";

// Expresión regular para validar correos electrónicos específicos
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

// Validación con Zod
const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." })
    .regex(emailRegex, {
      message:
        "Debe ser un correo electrónico válido de Gmail, Hotmail o Outlook.",
    }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "Debe tener al menos una letra mayúscula." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Debe tener al menos un carácter especial.",
    }),
});

export default LoginSchema;
