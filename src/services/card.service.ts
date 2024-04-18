import { Card } from "@/types/Card.types";
import { TCreateCardForm } from "@/validators/Card.validators";
import axios from "axios";

export async function getAllReviews() {
    return axios.get<Card[]>("cards")
}

export async function getMyReviews() {
    return axios.get<Card[]>("cards/my-cards")
}

export async function createReview(form: TCreateCardForm) {
    return axios.post<Card>("cards", form)
}
export async function updateReview(id: string, form: Partial<TCreateCardForm>) {
    return axios.put<Card>(`cards/${id}`, form)
}

export async function deleteReview(id: string) {
    return axios.delete<Card>(`cards/${id}`)
}

export async function likeToggleReview(id: string) {
    return axios.patch<Card>(`cards/${id}`)
}