import { Card } from "@/types/Card.types"
import React from "react"
import Review from "./Review"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { User } from "@/types/User.types"


export type ReviewListProps = {
    reviews: Card[]
}




export default function ReviewList({ reviews }: ReviewListProps) {

    const user = useSelector<RootState, User | undefined>(state => state.user.user)

    const isLiked = (card: Card) => {
        if (!user || !user._id) return false
        return card.likes.includes(user._id)
    }

    return <div className="flex flex-col w-full px-[.5rem] gap-2">
        {React.Children.toArray(reviews.map(review =>
            <Review review={review}
                isLiked={isLiked(review)}
            />))}
    </div>
}