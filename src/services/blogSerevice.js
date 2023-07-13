import http from "./httpService"

export const getPosts = () => {
    return http.get('/posts')
}