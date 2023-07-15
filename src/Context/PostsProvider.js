import { createContext, useContext, useEffect, useState } from "react";
import { getPost, getPosts } from "../services/blogSerevice";
import { async } from "q";

const postsContext = createContext();
const postsContextDispatcher = createContext();

const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState({
        loading: false,
        data: [],
        error: null
    });

    const [post, setPost] = useState({
        loading: false,
        data: [],
        error: null
    });

    const [categories, setCategories] = useState({
        loading: false,
        data: [],
        error: null
    });

    const [path, setPath] = useState('')

    const getCategory = (data) => {
        const categories = [...new Set(data.map(p => p.category))].map(cat => {
            return { count: data.filter(p => p.category == cat).length, title: cat }
        })
        return categories;
    }
    const getData = async () => {
        try {
            const { data } = await getPosts();
            setPosts({ ...posts, loading: false, data: data, error: null })
            setCategories({ ...posts, loading: false, data: getCategory(data), error: null });
        } catch (error) {
            setPosts({ ...posts, loading: false, data: [], error: error.message })
            setCategories({ ...posts, loading: false, data: [], error: error.message })
        }
    }
    const getSinglePost = async (path) => {
        try {
            const { data } = await getPost(path)
            setPost({ ...post, loading: false, data: data, error: null });
        } catch (error) {
            setPost({ ...post, loading: false, data: [], error: error.message });
        }
    }
    useEffect(() => {
        setPosts({ ...posts, loading: true, data: [], error: null });
        setCategories({ ...posts, loading: true, data: [], error: null });
        getData()
        if (path) {
            setPosts({ ...post, loading: true, data: [], error: null });
            getSinglePost(path);
        }
    }, [path])
    return (
        <postsContext.Provider value={{ posts, categories, post, setPath }}>
            <postsContextDispatcher.Provider value={setPosts}>
                {children}
            </postsContextDispatcher.Provider>
        </postsContext.Provider>
    );
}

export default PostsProvider;

export const usePosts = () => useContext(postsContext);
export const usePostsActions = () => useContext(postsContextDispatcher);