
import './App.css';
import Layout from './Layout/Layout';
import { Routes, Route, useLocation } from 'react-router-dom'
import routes from './routes'
import CartProvider from './Context/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WishProvider from './Context/WishProvider';
import AuthProvider from './Context/AuthProvider';
import { fixHeader } from './assets/js/script';
import ProductsProvider from './Context/ProductsProvider';
import PostsProvider from './Context/PostsProvider';

function App() {
  fixHeader();
  return (
    <>
      <AuthProvider>
        <ProductsProvider>
          <WishProvider>
            <CartProvider>
              <PostsProvider>
                <ToastContainer />
                <Routes>
                  <Route path='/' element={<Layout />}>
                    {
                      routes.map((rout) => {
                        return <Route key={rout.path} path={rout.path} element={rout.element} />
                      })
                    }
                  </Route>
                </Routes>
              </PostsProvider>
            </CartProvider>
          </WishProvider>
        </ProductsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
