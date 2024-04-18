import { User } from "./types/User.types";


export function wait(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout))
}


export function fullName(user: User) {
    return user.name.first + " " + user.name.last
}

export function prettyDate(d: string | Date) {
    return new Date(d).toLocaleDateString('he-il')
}