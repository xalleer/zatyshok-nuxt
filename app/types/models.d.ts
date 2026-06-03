//USER
export enum UserRole {
    CLIENT = 'CLIENT',
    HOST = 'HOST'
}

export enum Policy {
    FLEXIBLE = 'FLEXIBLE',
    STRICT = 'STRICT'
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

export interface UpdateProperty extends CreateProperty {
    description: string
    city: string
    address: string
    latitude: string
    longitude: string
    policy: Policy
    isActive: boolean
}

export interface Property extends CreateProperty {
    id: string
    description: string
    coverImage: string
    images: string []
    city: string
    address: string
    latitude: string
    longitude: string
    policy: Policy
    isActive: boolean
    hostId: string
    createdAt: string
    updatedAt: string
    rating: {
        description: string
    }
    reviewCount: number
}