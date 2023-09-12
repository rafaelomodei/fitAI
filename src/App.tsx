import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { TrainingProvider } from './providers/Training';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { MediaPipeProvider } from './providers/MediaPipe';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TrainingProvider>
        <MediaPipeProvider>
          <RouterProvider router={router} />
        </MediaPipeProvider>
      </TrainingProvider>
    </ChakraProvider>
  );
}
export default App;
