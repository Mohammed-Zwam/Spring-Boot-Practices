const endpointPrefix = import.meta.env.VITE_SERVER_PREFIX + "/categories";

export const getAllCategories = async () => {
    return fetch(endpointPrefix)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log(error))
}