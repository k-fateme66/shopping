import http from "./httpService"

export const getPosts = () => {
    return http.get('/posts')
}

export const getPost = (data) => {
    return http.get(`/posts/${data}`)
}