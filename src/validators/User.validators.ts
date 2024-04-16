
import phoneRegex from '@/assets/phoneRegex'
import z from 'zod'


const UserRegistrationForm = z.object({
    name: z.object({
        first: z.string(),
        middle: z.string().optional(),
        last: z.string()
    }),
    email: z.string().email("Email must be valid"),
    password: z.string().min(6, "Password must be at-least 6 symbols long"),
    image: z.object({
        url: z.string().url("image Must be a valid url"),
        alt: z.string().optional()
    }),
    address: z.object({
        state: z.string().optional(),
        country: z.string(),
        city: z.string(),
        street: z.string(),
        houseNumber: z.number().min(2, "House number must be minimum 2").max(256, "House number maximum 256"),
        zip: z.number().min(10000, "Zip code must be between 10000 and 9999999").max(9999999, "Zip code must be between 10000 and 9999999")
    }),
    phone: z.string().regex(new RegExp(phoneRegex), "Phone must be a valid phone number!"),
    isBusiness: z.boolean().default(false),
})
const UserLoginForm = UserRegistrationForm.pick({ email: true, password: true })

const UserUpdateForm = UserRegistrationForm.omit({ email: true, password: true, isBusiness: true })

type TUserRegistrationForm = z.infer<typeof UserRegistrationForm>
type TUserLoginForm = z.infer<typeof UserLoginForm>
type TUserUpdateForm = z.infer<typeof UserUpdateForm>

export {
    UserRegistrationForm,
    UserLoginForm,
    UserUpdateForm,
    type TUserRegistrationForm,
    type TUserLoginForm,
    type TUserUpdateForm
}