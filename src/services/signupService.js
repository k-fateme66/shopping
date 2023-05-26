import http from "./httpService";

export const signupUser = (data) => {
    return http.post('/users', data);
}