import ReviewList from "@/components/reviews/ReviewList"
import { useLikedReviews } from "@/store/cards.slice"


export default function LikedReviews() {

    const reviews = useLikedReviews()

    return <div className="w-full">
        <h1 className="text-[24px] font-bold p-2">Liked Reviews</h1>
        <hr className="w-[80%] max-w-[700px] mx-auto mt-2 mb-4" />

        <ReviewList reviews={reviews} />
        {reviews.length < 1 && <div> No Liked reviews</div>}
    </div>
}