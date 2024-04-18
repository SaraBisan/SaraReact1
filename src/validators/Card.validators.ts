
import phoneRegex from '@/assets/phoneRegex';
import z from 'zod'

// Define the Address schema
const Address = z.object({
    state: z.string().min(2).max(256).optional(),
    country: z.string().min(2).max(256),
    city: z.string().min(2).max(256),
    street: z.string().min(2).max(256),
    houseNumber: z.number().min(2).max(256),
    zip: z.number().min(10000).max(9999999).optional(),
});

// Define the Image schema
const Image = z.object({
    url: z.string().url().optional(),
    alt: z.string().min(2).max(256).optional(),
});

// Define the createCard schema using Zod
const CreateCardForm = z.object({
    title: z.string().min(2).max(256),
    subtitle: z.string().min(2).max(256),
    description: z.string().min(2).max(1024),
    phone: z.string().regex(phoneRegex),
    email: z.string().email().min(5).max(500),
    web: z.string().url().optional(),
    image: Image.optional(),
    address: Address.required(),
});

type TCreateCardForm = z.infer<typeof CreateCardForm>

export {
    CreateCardForm,
    type TCreateCardForm
}