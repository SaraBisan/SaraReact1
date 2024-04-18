import { Card } from "@/types/Card.types"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as cardService from '@/services/card.service'
import { TCreateCardForm } from "@/validators/Card.validators"
import { useSelector } from "react-redux"
import { RootState } from "."
import { User } from "@/types/User.types"
import { useMemo } from "react"

export interface ICardSlice {
    cards: Card[]
    currentUserCards: Card[]

    loading: boolean
    error: unknown
}


export const getAllReviews = createAsyncThunk("cards/getAllReviews", async () => {
    const { data } = await cardService.getAllReviews()
    return data
})


export const getMyReviews = createAsyncThunk("cards/getMyReviews", async () => {
    const { data } = await cardService.getMyReviews()
    return data
})


export const createReview = createAsyncThunk("cards/createReview", async (form: TCreateCardForm) => {
    const { data } = await cardService.createReview(form)
    return data
})


export const updateReview = createAsyncThunk("cards/updateReview", async ({
    id,
    form
}: {
    id: string,
    form: Partial<TCreateCardForm>
}) => {
    const { data } = await cardService.updateReview(id, form)
    return data
})

export const deleteReview = createAsyncThunk("cards/deleteReview", async (id: string) => {
    const { data } = await cardService.deleteReview(id)
    return data
})

export const likeToggleReview = createAsyncThunk("cards/likeToggleReview", async (id: string) => {
    const { data } = await cardService.likeToggleReview(id)
    return data
})

export const reviewsSlice = createSlice({
    name: "cards",
    initialState: {
        cards: [],
        currentUserCards: [],
        loading: false,
        error: undefined
    } as ICardSlice,
    reducers: {
        clearCurrentUserCards: (state) => { state.currentUserCards = [] }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllReviews.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.cards = action.payload
        })
        builder.addCase(getAllReviews.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
            state.cards = []
        })
        builder.addCase(getAllReviews.pending, (state, action) => {
            state.loading = true
        })


        // getMyReviews
        builder.addCase(getMyReviews.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.currentUserCards = action.payload
        })
        builder.addCase(getMyReviews.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
            state.currentUserCards = []
        })
        builder.addCase(getMyReviews.pending, (state, action) => {
            state.loading = true
        })

        // createReview
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.currentUserCards = [...state.currentUserCards, action.payload]
            state.cards = [...state.cards, action.payload]
        })
        builder.addCase(createReview.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        builder.addCase(createReview.pending, (state, action) => {
            state.loading = true
        })

        // updateReview
        builder.addCase(updateReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.currentUserCards = state.currentUserCards.map((review) => {
                if (review._id === action.payload._id) {
                    return action.payload
                }
                return review
            })
            state.cards = state.cards.map((review) => {
                if (review._id === action.payload._id) {
                    return action.payload
                }
                return review
            })
        })
        builder.addCase(updateReview.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        builder.addCase(updateReview.pending, (state, action) => {
            state.loading = true
        })


        // deleteReview
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.currentUserCards = state.currentUserCards.filter(r => r._id !== action.payload._id)
            state.cards = state.cards.filter(r => r._id !== action.payload._id)
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
        })
        builder.addCase(deleteReview.pending, (state, action) => {
            state.loading = true
        })


        // likeToggleReview
        builder.addCase(likeToggleReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.currentUserCards = state.currentUserCards.map((review) => {
                if (review._id === action.payload._id) {
                    return action.payload
                }
                return review
            })
            state.cards = state.cards.map((review) => {
                if (review._id === action.payload._id) {
                    return action.payload
                }
                return review
            })
        })
        builder.addCase(likeToggleReview.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(likeToggleReview.pending, (state, action) => {
        })
    }
})


export const useLikedReviews = () => {
    const reviews = useSelector<RootState, Card[]>(state => state.reviews.cards)

    const user = useSelector<RootState, User | undefined>(state => state.user.user)
    const likedReviews = useMemo(() => {
        if (!user || !user._id) return reviews
        return reviews.filter(r => r.likes.includes(user._id!))
    }, [reviews, user])

    return likedReviews
}

export const cardActions = reviewsSlice.actions