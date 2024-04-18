import CreateBusinessAccountDialog from "@/components/reviews/CreateBusinessAccountDialog";
import { RootState } from "@/store";
import { ICardSlice } from "@/store/cards.slice";
import { IUserSlice } from "@/store/user.slice";
import { Card } from "@/types/Card.types";
import { User } from "@/types/User.types";
import { FunctionComponent, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";




export default function UpdateReviewGuard<T extends object>(
    Component: FunctionComponent<T & { reviewToUpdate: Card }>,
    showLoading: boolean = true,
    redirect: boolean = false) {


    return function useGuard(props: T) {

        const { user, loading, error } = useSelector<RootState, IUserSlice>(state => state.user)
        const { id } = useParams()
        const { loading: reviewsLoading, currentUserCards } = useSelector<RootState, ICardSlice>(state => state.reviews)

        const reviewToUpdate = useMemo(() => {
            if (reviewsLoading) return null
            if (!id) return undefined
            return currentUserCards.find(r => r._id === id)
        }, [id, user, currentUserCards])

        if (((showLoading && loading) || (showLoading && reviewsLoading)) || id === undefined) {
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
        if (!user || !user.isBusiness || reviewToUpdate === undefined) {
            if (redirect) {
                return <Navigate to="/auth/login" />
            }
            return <div className="flex flex-col items-center">
                <span>
                    You are not allowed to view this page.
                </span>
                <Link to="/" className="text-blue-500">Back to home</Link>
            </div>
        }

        return <Component {...props} reviewToUpdate={reviewToUpdate as Card} />
    }
}