import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/types/User.types";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})



// Dispatcher
export type AppDispatch = typeof store.dispatch

// RootState
export type RootState = ReturnType<typeof store.getState>

// User hooks
export const useNonNullUser = () => {
    const user = useSelector<RootState, User | undefined>(state => state.user.user)
    if (!user) {
        throw new Error("User is null at useNonNullUser")
    }
    return user
}