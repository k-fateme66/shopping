import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop"
const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/shop', element: <Shop /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/contactus', element: <ContactUs /> },
    { path: '/product/*', element: <ProductDetails /> },
    { path: '/product', element: <ErrorPage /> },
    { path: '/blog', element: <Blog /> },
    { path: '/blog/category', element: <ErrorPage /> },
    { path: '/blog/*', element: <Blog /> },
    { path: '/*', element: <ErrorPage /> },
]
export default routes;
