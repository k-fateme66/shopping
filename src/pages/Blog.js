import { usePosts } from '../Context/PostsProvider';
import ErrorTemplate from '../commen/ErrorTemplate';
import Loading from '../commen/Loading';
import ProgressiveImg from '../commen/ProgressiveImg';
import CategoriesPost from '../component/CategoriesPost/CategoriesPost';
import { CreateFormatDate } from '../utils/CreateFormatDate';
import placeholderSrc from '../assets/img/placeholder.jpg'
import HeroSection from '../component/HeroSection/HeroSection';
import PaginatedItems from '../component/PaginatedItems/PaginatedItems';
import { NavLink, useLocation } from 'react-router-dom';




const Blog = () => {
    const { posts, categories } = usePosts();
    const { pathname } = useLocation();
    const titlePage = pathname.split('/').slice(-1).toString();
    function getPosts(posts) {
        return titlePage === 'blog' ? posts : posts.filter(p => p.category.toLowerCase() == titlePage)
    }
    const templateBlogRender = (_posts) => {
        const posts = getPosts(_posts)
        const featuredPost = posts[0];
        return (
            <>
                <div className='w-100 overflow-hidden md:text-center border-b border-slate-200 pb-8'>
                    <a href={`blog/${featuredPost.title.split(' ').join('-')}?id=${featuredPost.id}`} className='block mb-6'>
                        <ProgressiveImg src={featuredPost.image} placeholderSrc={placeholderSrc} alt={featuredPost.title} className='w-full' />
                    </a>
                    <div className='flex md:justify-center md:items-center mb-3'>
                        <a className='text-sm font-semibold mr-5' href={`blog/${featuredPost.title.split(' ').join('-')}?id=${featuredPost.id}`}>
                            {CreateFormatDate(featuredPost.creatAt)}
                        </a>
                        <a className='text-sm font-semibold uppercase' href={`/blog/${featuredPost.category}`}>{featuredPost.category}</a>
                    </div>
                    <a className='block' href={`blog/${featuredPost.title.split(' ').join('-')}?id=${featuredPost.id}`}>
                        <h3 className='text-lg md:text-center font-semibold mb-3'>{featuredPost.title}</h3>
                    </a>

                    <p className='mb-3 text-gray-500 text-sm overflow-hidden md:truncate w-full'>{featuredPost.body}</p>
                    <span className='relative inline-block'>
                        <a href={`blog/${featuredPost.title.split(' ').join('-')}?id=${featuredPost.id}`} className="text-sm font-semibold line-hover py-1 block before:content-[' '] before:absolute before:bg-slate-400 before:w-full before:bottom-0 before:h-[2px]">Read More</a>
                    </span>
                </div>
                <PaginatedItems itemsPerPage={3} items={posts} />
            </>
        )
    }
    return (
        <>
            <HeroSection title={titlePage} >
                <div className='absolute bottom-10 left-0 right-0 hidden md:block'>
                    {
                        categories.loading ? <Loading /> :
                            !categories.loading && categories.error ? <ErrorTemplate error={categories.error} /> :
                                categories.data && categories.data.length && <CategoriesPost />
                    }
                </div>
            </HeroSection>
            <div className='relative container md:max-w-screen-xl mx-auto px-4 pt-12 pb-24'>
                <div className='grid  grid-col-1 md:grid-cols-3 gap-8'>
                    <div className='md:col-span-2'>
                        <div className='flex flex-col justify-center overflow-hidden'>
                            {
                                posts.loading ? <Loading /> :
                                    !posts.loading && posts.error ? <ErrorTemplate error={posts.error} /> :
                                        posts.data && posts.data.length && templateBlogRender(posts.data)
                            }
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex flex-col pb-12 border-b border-slate-100'>
                            <h3 className='text-lg mb-8'>Search</h3>
                            <form className='relative'>
                                <input type='text' placeholder='Search the site' name='search' className='w-full' />
                                <button className='font-semibold text-sm absolute right-0 py-3'>SEARCH</button>
                            </form>
                        </div>
                        <div className='flex flex-col py-10 border-b border-slate-100 gap-y-5'>
                            <h3 className='text-lg mb-8'>Popular Posts</h3>
                            {
                                posts.loading ? <Loading /> :
                                    !posts.loading && posts.error ? <ErrorTemplate error={posts.error} /> :
                                        posts.data && posts.data.length && posts.data.slice(0, 3).map((post) => {
                                            return (
                                                <div key={post.id} className='w-100 overflow-hidden'>
                                                    <a className='flex flex-row justify-between items-center gap-x-5' href={`blog/${post.title.split(' ').join('-')}?id=${post.id}`}>
                                                        <div className='basis-1/3' >
                                                            <ProgressiveImg src={post.image} placeholderSrc={placeholderSrc} alt={post.title} className='w-full' />
                                                        </div>
                                                        <div className='basis-2/3 overflow-hidden'>
                                                            <h3 className='text-sm  font-semibold mb-3'>{post.title}</h3>
                                                            <span className='text-sm text-slate-400 font-semibold mr-4' >
                                                                {CreateFormatDate(post.creatAt)}
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })
                            }
                        </div>
                        <div className='flex flex-col py-10 border-b border-slate-100 gap-y-2'>
                            <h3 className='text-lg mb-8'>Categories</h3>
                            {
                                categories.loading ? <Loading /> :
                                    !categories.loading && categories.error ? <ErrorTemplate error={categories.error} /> :
                                        categories.data && categories.data.length && categories.data.map((cat, index) => {
                                            return (
                                                <NavLink key={index} className='flex justify-between items-center' to={`/blog/category/${cat.title.toLowerCase()}`}>
                                                    <p className='font-semibold text-sm uppercase'>{cat.title}</p>
                                                    <p className='text-sm font-semibold text-slate-400'>{cat.count}</p>
                                                </NavLink>
                                            )
                                        })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;

