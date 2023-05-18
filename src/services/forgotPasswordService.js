import http from "./httpService";

export const forgotPasswordUser = (data) => {
    return http.post('/user/forgotpassword', data)
}