import type { Product } from "./product";

export type pageResponse = {
    content: Product[],
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
    numberOfElements: number,
}