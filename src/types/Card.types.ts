export interface Address {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
}

export interface Image {
    url: string;
    alt?: string;
}

export interface Card {
    _id?: string
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    image: Image;
    address: Address;
    bizNumber: number;
    likes: string[];
    createAt: string;
    user_id?: string
}