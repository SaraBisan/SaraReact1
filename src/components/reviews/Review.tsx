import { Card } from "@/types/Card.types"
import { prettyDate } from "@/utils"
import deleteIcon from '@/assets/delete.png'
import editIcon from '@/assets/edit.png'
import viewIcon from '@/assets/visible.png'
import heartIconFill from '@/assets/heart.png'
import heartIconOutline from '@/assets/heart-outline.png'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { likeToggleReview } from "@/store/cards.slice"
import DeleteReviewDialog from "./DeleteReviewDialog"
import { useCallback, useMemo } from "react"
import { User } from "@/types/User.types"
import { useNavigate } from "react-router"


export type ReviewProps = {
    review: Card,
    isLiked: boolean
}
export default function Review({ review, isLiked }: ReviewProps) {

    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const likeReview = () => {
        if (review._id)
            dispatch(likeToggleReview(review._id))
    }
    const user = useSelector<RootState, User | undefined>(state => state.user.user)
    const ReviewActions = useCallback(() => {
        const show = (
            user && (user.isAdmin || (user.isBusiness && review.user_id === user._id))
        )
        if (show) {
            return <div className="flex flex-row items-center gap-2" >
                <img onClick={() => nav(`/update-review/${review._id}`)} className="img-icon" src={editIcon} />
                <DeleteReviewDialog review={review} />
            </div>
        }
        return null
    }, [user, review])

    return <div className="flex flex-col items-start w-full">
        <img src={review.image.url} alt={review.image.alt} width={200} height={200} className="img-2" />

        <h1 className="w-max flex flex-col items-start px-2 py-2">
            <b className="text-[22px] text-[#a52d2d]">
                {review.title}
            </b>
            <span className="text-[gray] translate-y-[-5px] text-[13px]">
                {review.subtitle}
            </span>
        </h1>
        <p className="max-h-[300px] overflow-y-scroll w-full text-start flex items-start px-2 py-4 bg-[#fffef7] border-[1px] border-[#f4f4f4] text-[#926767]">
            {review.description}

        </p>
        <hr />
        <div className="flex items-start justify-between w-full px-2 text-[12px] p-2">
            <span>
                {prettyDate(review.createAt)}
            </span>

            <div className="flex flex=row items-center gap-2">
                <img onClick={likeReview} className="img-icon mr-[1rem]" src={isLiked ? heartIconFill : heartIconOutline} />

                <img onClick={() => nav(`/view-review/${review._id}`)} className="img-icon mr-[1rem] opacity-[0.6]" src={viewIcon} />
                <ReviewActions />
            </div>
        </div>
        <hr className="bg-[#eded31] my-2 w-full" />
    </div>
}