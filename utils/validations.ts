import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z.string().min(8, { message: 'Password Too short' }),
});

export const RegisterSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z.string().min(8, { message: 'Password Too short' }),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Must be a valid email' }),
});