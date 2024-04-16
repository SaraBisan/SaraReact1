

import { User } from "@/types/User.types";
import { TUserLoginForm, TUserRegistrationForm, TUserUpdateForm } from "@/validators/User.validators";
import axios from "axios";

export function register(form: TUserRegistrationForm) {
    return axios.post<User>("users/register", form)
}

export function updateUser(form: TUserUpdateForm) {
    return axios.put<User>("users/update", form)
}

export function login(form: TUserLoginForm) {
    return axios.post<string>("users/login", form)
}

export function getUser() {
    return axios.get<User>("users/me")
}