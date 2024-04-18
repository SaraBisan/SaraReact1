import ReviewList from "@/components/reviews/ReviewList"
import { RootState } from "@/store"
import { Card } from "@/types/Card.types"
import { useSelector } from "react-redux"

export default function Home() {



    const reviews = useSelector<RootState, Card[]>(state => state.reviews.cards)


    return <div>


        <ReviewList reviews={reviews} />
    </div>
}