import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Watch from '../pages/Watch';
import Search from '../pages/Search';
import NotFound from '../pages/NotFound';

// Layout principal
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Configuração das rotas
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'watch/:videoId/:slug',
        element: <Watch />
      },
      {
        path: 'search/:query',
        element: <Search />
      }
    ]
  }
]); 