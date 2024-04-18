import AuthGuard from "@/guards/AuthGuard";
import { AppDispatch } from "@/store";
import { actions } from "@/store/user.slice";
import { wait } from "@/utils";
import { useEffect } from "react";
import { useDispatch, } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

function Logout() {
    const dispatch = useDispatch<AppDispatch>()

    const nav = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const logOutDelayed = async () => {
            await wait(2000)
            dispatch(actions.logout())
            toast("Logged out successfully, hope to see you soon!")
        }
        logOutDelayed()
        return () => {
            dispatch(actions.logout())
        }
    }, [])

    return <div className="flex flex-col items-center">
        <div>Logging out..  hope to see you soon!</div>
        <ClipLoader
            color={"#0000aa"}
            loading={true}
            cssOverride={{ marginBlock: '1rem' }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
}


export default AuthGuard(Logout, false /* No custom loading */, true /* Redirect */)