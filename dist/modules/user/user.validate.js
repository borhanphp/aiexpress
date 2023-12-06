"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchemaValidation = void 0;
const zod_1 = require("zod");
const fullNameSchemaValidation = zod_1.z.object({
    firstName: zod_1.z.string().max(10, {
        message: 'Must be less than 10 characters',
    }),
    lastName: zod_1.z.string().max(10, {
        message: 'Must be less than 10 characters',
    }),
});
const addressSchemaValidation = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const orderSchemaValidation = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const UserSchemaValidation = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6, { message: 'Must be more than 5 characters' }),
    fullName: fullNameSchemaValidation,
    age: zod_1.z.number(),
    address: addressSchemaValidation,
    email: zod_1.z.string().email(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    isActive: zod_1.z.boolean(),
    orders: zod_1.z.array(orderSchemaValidation).optional(),
});
exports.UpdateUserSchemaValidation = zod_1.z.object({
    userId: zod_1.z.number().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z
        .string()
        .min(6, { message: 'Must be more than 5 characters' })
        .optional(),
    fullName: fullNameSchemaValidation.optional(),
    age: zod_1.z.number().optional(),
    address: addressSchemaValidation.optional(),
    email: zod_1.z.string().email().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    isActive: zod_1.z.boolean().optional(),
    orders: zod_1.z.array(orderSchemaValidation).optional(),
});
exports.default = UserSchemaValidation;
