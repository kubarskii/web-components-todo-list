export type AddPrefix<T extends string, P = undefined> = P extends string ? `${P}${T}` : T
