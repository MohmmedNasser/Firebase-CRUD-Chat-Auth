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

// export const ProductSchema = z.object({
//     name: z.string().min(2, "Name must be at least 2 characters").max(50),
//     description: z.string().min(10, "Description must be at least 10 characters").max(250),
//     price: z.number({
//         invalid_type_error: "Price must be a number",
//         required_error: "Price is required",
//     }).min(0.01, "Price must be at least 0.01"),
// })

// export const ProductSchema = z.object({
//     id: z.string().nullable(),
//     name: z.string().min(2).max(50),
//     description: z.string().min(10).max(250),
//     price: z.number().min(1),
//     createdAt: z.string().nullable(),
//     updatedAt: z.string().nullable(),
//     userId: z.string().nullable(),
// })