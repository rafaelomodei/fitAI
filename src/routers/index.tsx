import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Start } from '../pages/Start';
import { Training } from '../pages/Training';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/training',
    element: <Training />,
  },
]);

export { router };
