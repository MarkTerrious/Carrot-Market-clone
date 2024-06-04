export type RequireOnlyone<T, Keys extends keyof T = keyof T> = {
    [K in Keys]-?: 
        Required<Pick<T, K>> &
        Partial<Record<Exclude<Keys, K>, undefined>> 
}[Keys]

export type RequireAtLeastone<T, Keys extends keyof T = keyof T> = {
    [K in Keys]-?:
        Required<Pick<T, K>> &
        Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

export type OBJ_SELECT<T, keys extends keyof T = keyof T> = {
    [k in keys]? : true
}