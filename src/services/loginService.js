import http from "./httpService";

export const loginUser = (data) => {
    return http.post('/users', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}