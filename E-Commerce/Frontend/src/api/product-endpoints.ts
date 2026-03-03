import type { pageResponse } from "../types/pageResponse";

const  endpointPrefix = import.meta.env.VITE_SERVER_PREFIX + "/products";

export const getProductsPage = async (page: number, size:number, sortDirection: "asc" | "desc") : Promise<pageResponse> => {
    return fetch(endpointPrefix + `?page=${page}&size=${size}&sortDirection=${sortDirection}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))
}

export const getProductsPageByCategoryId = async (categoryId: number, page: number, size:number, sortDirection: "asc" | "desc") : Promise<pageResponse> => {
    return fetch(endpointPrefix + `/category/${categoryId}?page=${page}&size=${size}&sortDirection=${sortDirection}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))
}

export const getProductsPageBySearchTerm = async (searchTerm: string, page: number, size:number, sortDirection: "asc" | "desc") : Promise<pageResponse> => {
    return fetch(endpointPrefix + `/search?query=${searchTerm}&page=${page}&size=${size}&sortDirection=${sortDirection}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))
}
