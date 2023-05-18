import http from "./httpService";

export const getProducts = () => {
    return http.get('/product');
}

export const getProduct = (data) => {
    return http.get(`/product/${data}`);
}