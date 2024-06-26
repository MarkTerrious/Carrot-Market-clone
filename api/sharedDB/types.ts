import { SMSToken } from "@prisma/client"

export interface UserSearch {
    id?: number,
    username?: string,
    email?: string,
    phone?: string,
    github_id?: string
}

export interface UserInterface {
    id         : number    
    username   : string  
    email?     : string  
    password?  : string 
    phone?     : string  
    github_id? : string  
    avatar?    : string
}

export interface CheckTokenProperty {
    phone       : string,
    token       : string,
}

export interface ProductInterface {
    id          : number
    title       : string
    price       : number
    photo       : string
    description : string
    userId      : number
    created_at  : Date
    updated_at  : Date
}