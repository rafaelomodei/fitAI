import { Card as CardCK, Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import { theme } from '../../theme';

export const Container = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 32px;

  @media screen and (max-width: 510px) {
    padding: 0px;
  }

  @media screen and (min-width: 510px) and (max-width: 768px) {
    padding: 0px 32px;
  }

  @media screen and (min-width: 768px) {
    padding: 0px 64px;
  }
`;

export const Card = styled(CardCK)`
  && {
    background-color: ${theme.colors.primary10};
    box-shadow: none;
    border: 1px dashed ${theme.colors.primary};
  }
`;
