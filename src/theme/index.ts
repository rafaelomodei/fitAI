import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  global: {
    body: {
      overflowX: 'hidden',
    },
  },
  colors: {
    primary: '#6083FF',
    primary110: '#4569E7',
    primary90: '#7694FF',
  },
});

export { theme };
