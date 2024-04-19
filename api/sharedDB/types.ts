export interface UserSearch {
    id?: number,
    username?: string,
    email?: string,
    phone?: string,
    github_id?: string
}

export interface AllUserProperty {
    id         : number    
    username   : string  
    email?     : string  
    password?  : string 
    phone?     : string  
    github_id? : string  
    avatar?    : string
}