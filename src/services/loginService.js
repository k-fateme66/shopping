import http from "./httpService";

export const loginUser = (data) => {
    console.log(data)
    return http.get(`/users?email=${data.email}`);
}