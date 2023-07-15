import { useEffect } from "react";
import { CreateFormatDate } from "../utils/CreateFormatDate";
import { useSearchParams } from "react-router-dom";
import { usePosts } from "../Context/PostsProvider";
import Loading from "../commen/Loading";
import ErrorTemplate from "../commen/ErrorTemplate";
import { BsArrowLeft, BsArrowRight, BsTelegram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import ProgressiveImg from "../commen/ProgressiveImg";
import placeholderSrc from '../assets/img/placeholder.jpg'

const BlogDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const _id = searchParams.get('id');
    const { post, setPath, posts } = usePosts();
    const { data } = post
    useEffect(() => {
        setPath(_id)
    }, [_id])

    const renderTemplate = (_post) => {
        return (
            <div className="relative container mx-auto px-4 pt-12">
                <div className='flex justify-center items-center mb-3'>
                    <span className='text-sm font-semibold mr-5 text-slate-400'>
                        {CreateFormatDate(_post.creatAt)}
                    </span>
                    <a className='text-sm font-semibold uppercase' href={`/blog/${_post.category}`}>{_post.category}</a>
                </div>
                <h1 className='text-2xl text-center font-semibold mb-4'>{_post.title}</h1>
                <div className="flex justify-center items-center my-8">
                    <ul className="flex items-center leading-none">
                        <li>
                            <a target="_blank" href={`https://www.twitter.com/intent/tweet?url=${window.location.href}`} className="text-sm mx-4 text-white w-9 h-9 flex justify-center items-center bg-blue-400 rounded-full ">
                                <BsTwitter className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href={`https://wa.me/?text=${window.location.href}`} className="text-sm mx-4 flex justify-center items-center text-white rounded-full w-9 h-9 bg-green-500">
                                <BsWhatsapp className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href={`https://t.me/share/url?url=${window.location.href}`} className="text-sm mx-4 flex justify-center items-center text-white rounded-full w-9 h-9 bg-blue-400">
                                <BsTelegram className="w-4 h-4" />
                            </a>
                        </li>
                    </ul>
                </div>
                <ProgressiveImg src={_post.image} placeholderSrc={placeholderSrc} alt={_post.title} className='md:w-2/3 mx-auto mb-8' />
                <div className="md:w-1/2 mx-auto mb-8">
                    <p>{_post.body}</p>
                </div>
                <div className='flex items-center justify-between md:w-1/2 mx-auto border-y border-y-gray-200 py-8'>
                    <a href='#' className=' text-slate-900 cursor-pointer flex items-center w-1/2 justify-center border-r border-r-gray-200 py-4'>
                        <BsArrowLeft className='h-4 w-4 mr-2' />
                        <span className="text-sm font-bold">PREVIOUS POST</span>
                    </a>
                    <a href='#' className=' text-slate-900 cursor-pointer flex items-center w-1/2 justify-center py-4'>
                        <span className="text-sm font-bold"> NEXT POST</span>
                        <BsArrowRight className='h-4 w-4 ml-2' />
                    </a>
                </div>
                <div className="md:w-1/2 mx-auto my-8">
                    <p className="text-center text-lg mb-7">You Might Also Like</p>
                    <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
                        <div className="p-3">
                            <img src={_post.image} className="w-full mb-8" />
                            <h5 className="text-center">{_post.title}</h5>
                        </div>
                        <div className="p-3">
                            <img src={_post.image} className="w-full mb-8" />
                            <h5 className="text-center">{_post.title}</h5>
                        </div>
                        <div className="p-3">
                            <img src={_post.image} className="w-full mb-8" />
                            <h5 className="text-center">{_post.title}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (post.loading) return <Loading />
    if (!post.loading && post.error) return <ErrorTemplate error={post.error} />
    return (
        <>
            {data && renderTemplate(data)}
        </>
    );
}

export default BlogDetails;