import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router"
import deleteIcon from '@/assets/delete.png'
import { Card } from "@/types/Card.types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { deleteReview } from "@/store/cards.slice"
import { toast } from "react-toastify"

type DeleteReviewDialogProps = {
    review: Card
}
export default function DeleteReviewDialog({ review }: DeleteReviewDialogProps) {
    const dispatch = useDispatch<AppDispatch>()

    const onDelete = () => {
        if (review._id)
            dispatch(deleteReview(review._id)).then((r) => {
                if (r.meta.requestStatus === 'fulfilled') {
                    toast("Review deleted successfully")
                }
                else {
                    toast("There was a problem deleting this review, please try again later.")
                }
            })
    }

    return <AlertDialog>
        <AlertDialogTrigger className="text-blue-500">
            <img className="img-icon" src={deleteIcon} />
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this review</AlertDialogTitle>
                <AlertDialogDescription>
                    You are about to delete the review ({review.title}),
                    Deleting operation is not reversible, once deleted a review cannot be restored.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}