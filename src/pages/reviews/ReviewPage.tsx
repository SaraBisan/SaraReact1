import Review from "@/components/reviews/Review"
import { RootState } from "@/store"
import { ICardSlice } from "@/store/cards.slice"
import { Card } from "@/types/Card.types"
import { User } from "@/types/User.types"
import { prettyDate } from "@/utils"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"



export default function ReviewPage() {

    const { id } = useParams()


    const {
        loading,
        error,
        cards
    } = useSelector<RootState, ICardSlice>(state => state.reviews)



    const review = useMemo(() => {
        return cards.find(c => c._id === id)
    }, [id, cards])


    const user = useSelector<RootState, User | undefined>(state => state.user.user)

    const isLiked = (card: Card) => {
        if (!user || !user._id) return false
        return card.likes.includes(user._id)
    }

    if (loading) {
        return <div>
            Loading review data..
            <br />
            <ClipLoader
                color={"#0000aa"}
                loading={loading}
                cssOverride={{ marginBlock: '1rem' }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }

    if (error) {
        return <div>
            Error occurred.
            <br />
            {typeof error === 'string' ? error : JSON.stringify(error)}
            <br />
            <Link to="/" className="text-blue-500">Back to home</Link>
        </div>
    }
    if (!review) {
        return <div>
            Review not found
            <br />
            <Link to="/" className="text-blue-500">Back to home</Link>
        </div>
    }

    return <div>
        <Review review={review} isLiked={isLiked(review)} />

        <div className="bg-[#f7f6d2aa] border-[1px] rounded-md p-2 justify-start w-fit">

            <div>
                Address: {review.address.country + ", " + review.address.city + ", " + review.address.street + " Number:" + review.address.houseNumber}
            </div>

            <div>
                Reviewer Number: {review.bizNumber}
            </div>
            <div>
                Reviewer Phone: {review.phone}
            </div>

            <div>
                Reviewer Email: {review.email}
            </div>

            <div>
                Published at {prettyDate(review.createAt)}
            </div>
        </div>


    </div>
}