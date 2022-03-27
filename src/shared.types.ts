export type AddPrefix<T extends string, P extends string> = P extends string ? `data-${T}` : T
