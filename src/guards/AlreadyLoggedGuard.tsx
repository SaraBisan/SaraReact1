import { RootState } from "@/store";
import { IUserSlice } from "@/store/user.slice";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AlreadyLoggedGuard<T extends object>(Component: FunctionComponent<T>) {


    return function useGuard(props: T) {

        const { user, loading } = useSelector<RootState, IUserSlice>(state => state.user)

        if (user) {
            return <Navigate to="/" />
        }

        return <Component {...props} />
    }
}