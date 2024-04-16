import AlreadyLoggedGuard from "@/guards/AlreadyLoggedGuard";
import { RootState } from "@/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader'

function Auth() {


    const loading = useSelector<RootState, boolean>(state => state.user.loading)
    const { pathname } = useLocation()

    const BottomLinks = useCallback(() => {
        if (pathname.includes("auth/register")) {
            return <div className="w-fit mx-auto p-4 flex flex-row items-center gap-2">
                <span>Already have an account?</span>
                <Link to="/auth/login" className="text-blue-500">Sign in now</Link>
            </div>
        }
        else {
            return <div className="w-fit mx-auto p-4 flex flex-row items-center gap-2">
                <span>Don't have an account?</span>
                <Link to="/auth/register" className="text-blue-500">Create one now</Link>
            </div>
        }
    }, [pathname])

    return <div>

        <Outlet />
        <ClipLoader
            color={"#0000aa"}
            loading={loading}
            cssOverride={{ marginBlock: '1rem' }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <BottomLinks />


    </div>
}

export default AlreadyLoggedGuard(Auth)