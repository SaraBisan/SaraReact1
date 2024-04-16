import { Button } from "@/components/ui/button"
import AuthGuard from "@/guards/AuthGuard"
import { useNonNullUser } from "@/store"
import { fullName } from "@/utils"
import { Link, useNavigate } from "react-router-dom"


function Profile() {

    const user = useNonNullUser()
    const nav = useNavigate()

    return <div className="flex flex-col items-center">


        <div className="w-fit flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 p-2">
                <img src={user.image.url} alt={user.image.alt} width={100} height={100} className="img-1" />
                <h1>{fullName(user)}</h1>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Button onClick={() => nav("/profile-update")}>
                    Update profile
                </Button>

                <Button onClick={() => nav("/profile-reviews")}>
                    My Reviews
                </Button>
            </div>

        </div>


    </div>
}

export default AuthGuard(Profile)