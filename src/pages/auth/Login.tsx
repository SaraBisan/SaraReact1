import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { TUserLoginForm, UserLoginForm } from "@/validators/User.validators"
import { AppDispatch, RootState } from "@/store"
import { loginUser, registerUser } from "@/store/user.slice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"


export default function Login() {

    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState, boolean>(state => state.user.loading)
    const form = useForm<TUserLoginForm>({
        resolver: zodResolver(UserLoginForm),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: TUserLoginForm) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(loginUser(values)).then(() => {
            toast("Logged successfully, Have fun exploring our website.")
            nav("/")
        })
    }

    return <Form {...form}>
        <h1 className="text-[24px] font-bold p-2">Login</h1>
        <hr className="w-[80%] max-w-[700px] mx-auto my-2" />
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[80%] max-w-[500px] mx-auto"
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div className=" space-y-2">


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
            </div>

            <Button disabled={loading} type="submit" className="w-full" style={{ gridColumn: 'span 2' }}>
                Login
            </Button>
        </form>
    </Form>
}