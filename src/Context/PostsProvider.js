import { createContext, useContext, useEffect, useState } from "react";
import { getCategoryPost, getPost, getPosts } from "../services/blogSerevice";
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

    const [postsCategory, setPostsCategory] = useState({
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
    const [pathCategory, setPathCategory] = useState('')

    const getCategory = (data) => {
        const categories = [...new Set(data.map(p => p.category))].map(cat => {
            return { count: data.filter(p => p.category === cat).length, title: cat }
        })
        return categories;
    }
    const getDataCategory = async (path) => {
        try {
            const { data } = await getCategoryPost(path);
            setPostsCategory({ ...postsCategory, loading: false, data: data, error: null })
        } catch (error) {
            setPostsCategory({ ...postsCategory, loading: false, data: [], error: error.message })
        }
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
            console.log(path);
            setPost({ ...post, loading: true, data: [], error: null });
            getSinglePost(path);
        }

        if (pathCategory) {
            setPostsCategory({ ...postsCategory, loading: true, data: [], error: null });
            getDataCategory(pathCategory)
        }
    }, [path, pathCategory])
    return (
        <postsContext.Provider value={{ posts, categories, post, setPath, setPathCategory, postsCategory }}>
            <postsContextDispatcher.Provider value={setPosts}>
                {children}
            </postsContextDispatcher.Provider>
        </postsContext.Provider>
    );
}

export default PostsProvider;

export const usePosts = () => useContext(postsContext);
export const usePostsActions = () => useContext(postsContextDispatcher);