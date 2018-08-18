

export type Middleware<T> = (context: T, next: () => any) => any