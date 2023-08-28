import './App.css';
import Layout from './Layout/Layout';
import { Routes, Route } from 'react-router-dom'
import routes from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from './Providers/Providers';

function App() {
  return (
    <>
      <Providers>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Layout />}>
            {
              routes.map((rout) => {
                return <Route
                  key={rout.path}
                  path={rout.path}
                  element={rout.element}
                />
              })
            }
          </Route>
        </Routes>
      </Providers>
    </>
  );
}

export default App;
