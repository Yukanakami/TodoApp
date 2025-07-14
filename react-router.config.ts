import { createBrowserRouter } from 'react-router-dom';
import Root from './app/root'; // sesuaikan path jika pindah ke src/
import Home from './app/pages/Home'; // halaman utama

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);
