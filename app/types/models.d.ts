//USER
export enum UserRole {
    CLIENT = 'CLIENT',
    HOST = 'HOST'
}

//AUTH

export interface SendOtp {
    phone: string
}

export interface VerifyOtp {
    phone: string
    code: string,
    role?: UserRole
}


export interface User {
    createdAt: string
    id: string
    name: string | null
    phone: string
    updatedAt: string
    role: UserRole
}

//PROPERTY
export interface CreateProperty {
    name: string
    slug: string
}