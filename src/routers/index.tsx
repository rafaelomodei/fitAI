import { createBrowserRouter } from 'react-router-dom';
import { AnalyzeTraining } from '../pages/AnalyzeTraining';
import { Home } from '../pages/Home';
import { Start } from '../pages/Start';
import { Training } from '../pages/Training';
import { Container } from './container';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/inicio',
    element: <Home />,
  },
  {
    path: '/treino',
    element: <Training />,
  },
  {
    path: '/analise-treino',
    element: (
      <Container>
        <AnalyzeTraining />
      </Container>
    ),
  },
]);

export { router };
