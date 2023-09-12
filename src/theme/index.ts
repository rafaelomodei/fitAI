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
    primary30: '#C0CEFF',
    primary10: '#F1F4FF',
  },
});

export { theme };
