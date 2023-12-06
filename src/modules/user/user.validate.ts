import { z } from 'zod';

const fullNameSchemaValidation = z.object({
  firstName: z.string().max(10, {
    message: 'Must be less than 10 characters',
  }),
  lastName: z.string().max(10, {
    message: 'Must be less than 10 characters',
  }),
});
const addressSchemaValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const orderSchemaValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UserSchemaValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().min(6, { message: 'Must be more than 5 characters' }),
  fullName: fullNameSchemaValidation,
  age: z.number(),
  address: addressSchemaValidation,
  email: z.string().email(),
  hobbies: z.array(z.string()),
  isActive: z.boolean(),
  orders: z.array(orderSchemaValidation).optional(),
});
export const UpdateUserSchemaValidation = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z
    .string()
    .min(6, { message: 'Must be more than 5 characters' })
    .optional(),
  fullName: fullNameSchemaValidation.optional(),
  age: z.number().optional(),
  address: addressSchemaValidation.optional(),
  email: z.string().email().optional(),
  hobbies: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  orders: z.array(orderSchemaValidation).optional(),
});

export default UserSchemaValidation;
