import ReviewList from "@/components/reviews/ReviewList"
import { RootState } from "@/store"
import { Card } from "@/types/Card.types"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function MyReviews() {

    const reviews = useSelector<RootState, Card[]>(state => state.reviews.currentUserCards)

    return <div className="w-full">
        <h1 className="text-[24px] font-bold p-2">My Reviews</h1>
        <hr className="w-[80%] max-w-[700px] mx-auto mt-2 mb-4" />

        <ReviewList reviews={reviews} />
        {reviews.length < 1 && <div>
            You have not created any reviews
            <Link to="/create-review" className="mx-2 text-[14px] text-blue-500">Create review now</Link>
        </div>}

    </div>
}