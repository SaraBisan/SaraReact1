import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { TUserRegistrationForm, UserRegistrationForm } from "@/validators/User.validators"
import { AppDispatch, RootState } from "@/store"
import { registerUser } from "@/store/user.slice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"


const InputCheckbox = Input as any
export default function Register() {

    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState, boolean>(state => state.user.loading)
    const form = useForm<TUserRegistrationForm>({
        resolver: zodResolver(UserRegistrationForm),
        defaultValues: {
            email: "",
            password: "",
            isBusiness: false,
            address: {
                country: "",
                state: "",
                houseNumber: 0,
                zip: 99999,
                street: ""
            },
            image: {
                url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
                alt: ""
            },
        },
    })

    function onSubmit(values: TUserRegistrationForm) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(registerUser(values)).then(() => {
            toast("Registered successfully, you may login.")
            nav("/auth/login")
        })
    }

    return <Form {...form}>
        <h1 className="text-[24px] font-bold p-2">Register</h1>
        <hr className="w-[80%] max-w-[700px] mx-auto my-2" />
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[80%] max-w-[700px] mx-auto"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className=" space-y-2">

                <FormField
                    control={form.control}
                    name="name.first"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>This is your first name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name.middle"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Middle Name (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormDescription>This is your middle name (if any).</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name.last"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Smith" {...field} />
                            </FormControl>
                            <FormDescription>This is your last name.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormDescription>This is your email address.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription>Password must be at least 6 characters long.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input placeholder="0503316081" {...field} />
                            </FormControl>
                            <FormDescription>This is your israeli phone number.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <div className=" space-y-2">
                <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormDescription>This is your country.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>State (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormDescription>This is your state (if any).</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormDescription>This is your City address.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input placeholder="Street" {...field} />
                            </FormControl>
                            <FormDescription>This is your street address.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address.houseNumber"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>House Number</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="House Number" {...field} onChange={(e) => {
                                    // Ensure value is always a number
                                    let value: any = parseInt(e.target.value);
                                    if (isNaN(value)) value = ''
                                    field.onChange(value);
                                }} />
                            </FormControl>
                            <FormDescription>This is your house number.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address.zip"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Zip Code" {...field} onChange={(e) => {
                                    // Ensure value is always a number
                                    let value: any = parseInt(e.target.value);
                                    if (isNaN(value)) value = ''
                                    field.onChange(value);
                                }} />
                            </FormControl>
                            <FormDescription>This is your zip code.</FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <FormField
                control={form.control}
                name="image.url"
                render={({ field }) => (
                    <FormItem className="min-h-[130px]" style={{ gridColumn: 'span 2' }} >

                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com/profile.jpg" {...field} />
                        </FormControl>
                        <FormDescription>This is the URL to your profile image.</FormDescription>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="image.alt"
                render={({ field }) => (
                    <FormItem className="min-h-[130px]" style={{ gridColumn: 'span 2' }} >

                        <FormLabel>Profile Image Alt Text (optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="Profile Image" {...field} />
                        </FormControl>
                        <FormDescription>This is the alt text for your profile image.</FormDescription>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="isBusiness"
                render={({ field }) => (
                    <FormItem className="min-h-[130px]" style={{ gridColumn: 'span 2' }} >

                        <FormLabel>Indicator if your account will be a business account</FormLabel>
                        <FormControl>
                            <InputCheckbox type="checkbox" placeholder="Business" {...field} onChange={(e: any) => {
                                field.onChange(e.target.checked);
                            }} />
                        </FormControl>
                        <FormDescription>This indicates if your account is business type.</FormDescription>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button disabled={loading} type="submit" className="w-full" style={{ gridColumn: 'span 2' }}>
                Register
            </Button>
        </form>
    </Form>
}