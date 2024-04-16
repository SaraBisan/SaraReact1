import { getUser, login, register, updateUser } from "@/services/user.service";
import { User } from "@/types/User.types";
import { wait } from "@/utils";
import { TUserLoginForm, TUserRegistrationForm, TUserUpdateForm } from "@/validators/User.validators";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface IUserSlice {
    user: User | undefined
    token: string | null
    loading: boolean
    error: unknown
}


export const updateUserAction = createAsyncThunk("user/updateUser", async (form: TUserUpdateForm) => {
    const { data } = await updateUser(form)
    // simulate wait time..
    await wait(3000)
    return data
})

export const registerUser = createAsyncThunk("user/registerUser", async (form: TUserRegistrationForm) => {
    const { data } = await register(form)
    // simulate wait time..
    await wait(3000)
    return data
})

export const loginUser = createAsyncThunk("user/loginUser",
    async (form: TUserLoginForm) => {
        const { data } = await login(form)
        return data
    })

export const me = createAsyncThunk("user/me",
    async () => {
        const { data } = await getUser()
        return data
    })


export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: undefined,
        user: undefined,
        token: localStorage.getItem('token')
    } as IUserSlice,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.user = undefined
        }
    },
    extraReducers: (builder) => {
        // updateUser
        builder.addCase(updateUserAction.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.user = action.payload
        })
        builder.addCase(updateUserAction.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        builder.addCase(updateUserAction.pending, (state, action) => {
            state.loading = true
        })
        // registerUser
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true
        })
        // loginUser
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            if (action.payload)
                localStorage.setItem('token', action.payload)
            state.token = action.payload
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
        })
        // me
        // loginUser
        builder.addCase(me.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.user = action.payload
        })
        builder.addCase(me.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
            state.token = null
            localStorage.removeItem('token')
        })
        builder.addCase(me.pending, (state, action) => {
            state.loading = true
        })
    }

})

export const actions = userSlice.actions
