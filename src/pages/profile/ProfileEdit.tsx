import AuthGuard from "@/guards/AuthGuard";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { TUserUpdateForm, UserUpdateForm } from "@/validators/User.validators"
import { AppDispatch, RootState, useNonNullUser } from "@/store"
import { updateUserAction } from "@/store/user.slice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";


function ProfileEdit() {


    const user = useNonNullUser()
    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState, boolean>(state => state.user.loading)
    const form = useForm<TUserUpdateForm>({
        resolver: zodResolver(UserUpdateForm),
        defaultValues: user,
    })

    function onSubmit(values: TUserUpdateForm) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(updateUserAction(values)).then(() => {
            toast("Profile Updated successfully.")
            nav("/profile")
        })
    }

    return <>
        <div className="w-[100%] flex items-start p-[1rem]">
            <Link to="/profile" className="text-[14px]">Back to profile</Link>
        </div>
        <Form {...form} >
            <h1 className="text-[24px] font-bold p-2">Update Profile</h1>
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

                <Button disabled={loading} type="submit" className="w-full" style={{ gridColumn: 'span 2' }}>
                    Save Changes
                </Button>
            </form>
            <ClipLoader
                color={"#0000aa"}
                loading={loading}
                cssOverride={{ marginBlock: '1rem' }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Form>
    </>
}



export default AuthGuard(ProfileEdit, false /* No default loading indication */)