import { DrawerContent as DrawerContentCK } from '@chakra-ui/react';
import { styled } from 'styled-components';

export const DrawerContent = styled(DrawerContentCK)`
  && {
    @media (min-width: 768px) {
      max-width: 360px;
    }
  }
`;
