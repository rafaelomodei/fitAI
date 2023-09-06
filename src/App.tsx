import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { TrainingProvider } from './providers/Training';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TrainingProvider>
        <RouterProvider router={router} />
      </TrainingProvider>
    </ChakraProvider>
  );
}
export default App;
