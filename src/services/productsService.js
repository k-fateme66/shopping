import http from "./httpService";

export const getProducts = () => {
    return http.get('/products');
}

export const getProduct = (data) => {
    return http.get(`/products/${data}`);
}