import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { TUserRegistrationForm, UserRegistrationForm } from "@/validators/User.validators"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { CreateCardForm, TCreateCardForm } from "@/validators/Card.validators"
import { createReview, updateReview } from "@/store/cards.slice"
import AuthGuard from "@/guards/AuthGuard"
import { useCallback, useMemo } from "react"
import BusinessGuard from "@/guards/BusinessGuard"
import UpdateReviewGuard from "@/guards/UpdateReviewGuard"
import { Card } from "@/types/Card.types"


function UpdateReview({ reviewToUpdate }: { reviewToUpdate: Card }) {
    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState, boolean>(state => state.user.loading)


    const form = useForm<TCreateCardForm>({
        resolver: zodResolver(CreateCardForm),
        defaultValues: reviewToUpdate
    })


    const createReviewError = useSelector<RootState, unknown>(state => state.reviews.error)


    const CreateReviewErrorLabel = useCallback(() => {
        if (createReviewError && (createReviewError as any).message.includes("401")) {
            return <div className="h-[50px] text-[14px] text-[red] max-w-[350px] mx-auto text-center" style={{ gridColumn: 'span 2' }}>{"You are either not logged in, or your account is not business type"}</div>
        }
        return <div className="h-[30px] block opacity-0" style={{ gridColumn: 'span 2' }}></div>
    }, [createReviewError])
    function onSubmit(values: TCreateCardForm) {
        if (!reviewToUpdate._id) {
            toast("Unknown error occurred, please refresh the page and try again")
            return
        }
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(updateReview({
            id: reviewToUpdate._id,
            form: values
        })).then((r) => {
            if (r.meta.requestStatus === "rejected") {
                if (createReviewError && (createReviewError as any).message.includes("401")) {
                    toast("You are either not logged in, or your account is not business type")
                }
            } else {
                toast("Review updated successfully")
                nav("/")
            }
        })
    }

    return <Form {...form}>
        <h1 className="text-[24px] font-bold p-2">Update restaurant review</h1>
        <hr className="w-[80%] max-w-[700px] mx-auto my-2" />
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[80%] max-w-[700px] mx-auto"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className=" space-y-2">

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Golda is amazing." {...field} />
                            </FormControl>
                            <FormDescription>This is your review title.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Sub title</FormLabel>
                            <FormControl>
                                <Input placeholder="Refreshing ice cream experience" {...field} />
                            </FormControl>
                            <FormDescription>This is your review sub title .</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="On a sunny day at golda ice cream house.." {...field} />
                            </FormControl>
                            <FormDescription>This is your review description.</FormDescription>

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
                    name="web"
                    render={({ field }) => (
                        <FormItem className="min-h-[130px]">

                            <FormLabel>Website url</FormLabel>
                            <FormControl>
                                <Input placeholder="Website url" {...field} />
                            </FormControl>
                            <FormDescription>Website url of the business.</FormDescription>
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

                        <FormLabel>Review Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com/profile.jpg" {...field} />
                        </FormControl>
                        <FormDescription>This is the URL to your Review image.</FormDescription>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="image.alt"
                render={({ field }) => (
                    <FormItem className="min-h-[130px]" style={{ gridColumn: 'span 2' }} >

                        <FormLabel>Review Image Alt Text (optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="Review Image" {...field} />
                        </FormControl>
                        <FormDescription>This is the alt text for your Review image.</FormDescription>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button disabled={loading} type="submit" className="w-full" style={{ gridColumn: 'span 2' }}>
                Save changes
            </Button>
            <CreateReviewErrorLabel />
        </form>
    </Form>
}

export default UpdateReviewGuard(UpdateReview)