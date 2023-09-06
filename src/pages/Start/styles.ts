import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import { theme } from '../../theme';

export const Container = styled(Flex)`
  width: 100%;
  height: 100vh;
  color: white;
  justify-content: center;
  background-color: ${theme.colors.primary};
  background-repeat: no-repeat;
  background-position: 64% 50%;

  @media screen and (max-width: 510px) {
    background-position: 42% 50%;
  }

  @media screen and (min-width: 510px) and (max-width: 768px) {
    background-position: 39% 50%;
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    background-position: 28% 50%;
  }
`;
 