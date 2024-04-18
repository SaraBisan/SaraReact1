

interface Name {
    first: string
    middle?: string
    last: string
}

interface UserImage {
    url: string
    alt?: string
}

export interface User {
    _id?: string
    name: Name
    image: UserImage
    address: Address
    email: string
    password: string
    isAdmin: boolean
    isBusiness: boolean
    phone: string
    createdAt: string
}

interface Address {
    state?: string
    country: string
    city: string
    street: string
    houseNumber: number
    zip: number
}
