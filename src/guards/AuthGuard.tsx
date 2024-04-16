import { RootState } from "@/store";
import { IUserSlice } from "@/store/user.slice";
import { User } from "@/types/User.types";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";




export default function AuthGuard<T extends object>(Component: FunctionComponent<T>,
    showLoading: boolean = true,
    redirect: boolean = false) {


    return function useGuard(props: T) {

        const { user, loading, error } = useSelector<RootState, IUserSlice>(state => state.user)

        if (showLoading && loading) {
            return <div> Loading... </div>
        }

        if (error) {
            return <div>
                There was a problem logging in, please try refreshing the page<br />
                <span>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </span>
            </div>
        }
        if (!user) {
            if (redirect) {
                return <Navigate to="/auth/login" />
            }
            return <div>
                You must be authenticated to view this page. <Link to="/auth/login">Login here</Link>
            </div>
        }

        return <Component {...props} />
    }
}